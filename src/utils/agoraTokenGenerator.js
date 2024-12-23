import { RtcTokenBuilder, RtcRole } from "agora-access-token";

const appID = process.env.AGORA_APP_ID;
const appCertificate = process.env.AGORA_APP_CERTIFICATE;

export const generateAgoraToken = (channelName, uid, role = RtcRole.PUBLISHER, expireTime = 3600) => {
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
