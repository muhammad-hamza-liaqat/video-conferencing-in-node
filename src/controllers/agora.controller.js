import { generateAgoraTokenHelper } from "../utils/agoraHelpers/agoraTokenGenerator.js";
import { HTTPResponse } from "../utils/response.js"
import statusCodes from "http-status-codes"

export const generateAgoraToken = async (req, res) => {
    const { channelName, uid } = req.body;
    const token = generateAgoraTokenHelper(channelName, uid)
    // console.log("token---------", token);
    let response = new HTTPResponse("Token Generated successfully", token)
    return res.status(statusCodes.CREATED).json(response)
}