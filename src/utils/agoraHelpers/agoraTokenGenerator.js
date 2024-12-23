import pkg from "agora-access-token";
const { RtcTokenBuilder, RtcRole } = pkg;
import { AGORA_APP_ID, AGORA_APP_CERTIFICATE } from "../../env/variables.js"

const appID = AGORA_APP_ID;
const appCertificate = AGORA_APP_CERTIFICATE;

export const generateAgoraTokenHelper = (channelName, uid, role = RtcRole.PUBLISHER, expireTime = 3600) => {

    // console.log(appID, appCertificate, "helper agora")
    if (!appID || !appCertificate) {
        throw new Error('failed to fetch appID and appCertificate from env');
    }

    if (!channelName || typeof channelName !== 'string') {
        throw new Error('Channel name is invalid or missing.');
    }

    if (typeof uid !== 'number' && typeof uid !== 'string') {
        throw new Error('UID must be a string or a number.');
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTimestamp + expireTime;

    return RtcTokenBuilder.buildTokenWithUid(
        appID,
        appCertificate,
        channelName,
        uid,
        role,
        privilegeExpireTime
    );
};