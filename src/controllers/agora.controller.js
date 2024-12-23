import { HTTPResponse } from "../utils/response.js"
import statusCodes from "http-status-codes"

export const generateAgoraToken = async (req, res) => {
    let response = new HTTPResponse("response from controller", statusCodes.OK)
    return res.status(statusCodes.OK).json(response)
}