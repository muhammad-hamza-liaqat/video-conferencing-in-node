let client;
let localTracks = { audioTrack: null, videoTrack: null };
let remoteUsers = {}; // Store remote users

document.getElementById('agoraForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const channelName = document.getElementById('channelName').value;
    const uid = document.getElementById('uid').value;

    // Validate inputs
    if (!channelName || !uid) {
        alert('Please enter both Channel Name and UID.');
        return;
    }

    console.log(`Channel Name: ${channelName}, UID: ${uid}`);

    // Call the backend API to get the Agora token
    try {
        const response = await fetch('http://127.0.0.1:4001/agora/agora-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ channelName, uid }),
        });

        const data = await response.json();
        if (response.ok) {
            const token = data.data;
            console.log('Generated Token:', token);
            alert('Token generated successfully! Joining the channel...');
            await joinChannel(channelName, uid, token);
        } else {
            console.error('Error generating token:', data.message);
            alert(data.message || 'Failed to generate token.');
        }
    } catch (error) {
        console.error('Error calling backend API:', error);
        alert('An error occurred while generating the token. Please check the console.');
    }
});

async function joinChannel(channelName, uid, token) {
    client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

    try {
        const appID = '7d69cb550a1c41438b74160389ac6d23'; // Ensure this matches your Agora Console App ID
        console.log(`Joining channel with App ID: ${appID}`);

        // Join the channel
        await client.join(appID, channelName, token, uid);
        console.log('Joined channel successfully!');

        // Hide the form after joining
        document.getElementById('agoraForm').style.display = 'none';

        // Create and publish local tracks
        localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack();

        // Display local video
        displayVideoStream(uid, localTracks.videoTrack);

        // Publish local tracks
        await client.publish(Object.values(localTracks));
        console.log('Published local tracks!');

        // Handle remote users
        client.on('user-published', handleUserPublished);
        client.on('user-unpublished', handleUserUnpublished);

        alert('You have successfully joined the channel!');
    } catch (error) {
        console.error('Failed to join the channel:', error);
        alert('Failed to join the channel. Check the console for details.');
    }
}

function displayVideoStream(uid, track, isLocal = true) {
    const videoContainer = document.getElementById('video-container');
    const videoElement = document.createElement('div');
    videoElement.id = `user-${uid}`;
    videoElement.style.width = '300px';
    videoElement.style.height = '200px';
    videoElement.style.margin = '10px';
    videoElement.style.backgroundColor = '#000';
    videoElement.innerText = isLocal ? 'You' : `User ${uid}`;
    videoContainer.appendChild(videoElement);

    // Play video track
    track.play(videoElement.id);
}

async function handleUserPublished(user, mediaType) {
    const id = user.uid;
    remoteUsers[id] = user;

    await client.subscribe(user, mediaType);
    console.log(`Subscribed to remote user: ${id}`);

    if (mediaType === 'video') {
        const remoteVideoTrack = user.videoTrack;
        displayVideoStream(id, remoteVideoTrack, false);
    }

    if (mediaType === 'audio') {
        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack.play();
    }
}

function handleUserUnpublished(user) {
    const id = user.uid;
    console.log(`User unpublished: ${id}`);
    const videoElement = document.getElementById(`user-${id}`);
    if (videoElement) {
        videoElement.remove();
    }
    delete remoteUsers[id];
}

// Control buttons (mute/unmute audio and video)
document.addEventListener('click', (event) => {
    if (event.target.id === 'muteAudio') {
        const isEnabled = localTracks.audioTrack.isEnabled();
        localTracks.audioTrack.setEnabled(!isEnabled);
        event.target.innerText = isEnabled ? 'Unmute Audio' : 'Mute Audio';
    }

    if (event.target.id === 'toggleVideo') {
        const isEnabled = localTracks.videoTrack.isEnabled();
        localTracks.videoTrack.setEnabled(!isEnabled);
        event.target.innerText = isEnabled ? 'Turn On Video' : 'Turn Off Video';
    }
});
