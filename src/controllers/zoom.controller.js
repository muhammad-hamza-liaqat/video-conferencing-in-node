import statusCode from "http-status-codes";
import axios from "axios";
import { getAccessToken } from "../utils/zoom/zoom.helpers.js";
import { HTTPResponse } from "../utils/response.js";

export const createMeeting = async (req, res) => {
    const { topic, password } = req.body;

    const accessToken = await getAccessToken();

    const zoomResponse = await axios.post(
        "https://api.zoom.us/v2/users/me/meetings",
        {
            topic: topic || "Instant Meeting",
            type: 1,
            password: password || "1122",
            settings: {
                host_video: true,
                participant_video: true,
                join_before_host: false,
                waiting_room: true,
                mute_upon_entry: true,
                // embed_password_in_join_link: false,
            },
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );

    const { join_url } = zoomResponse.data;
    const response = new HTTPResponse("Meeting Created Successfully", join_url);
    return res.status(statusCode.CREATED).json(response);
};
// http://localhost:4001/api/zoom/create-meeting