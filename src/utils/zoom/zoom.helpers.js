import axios from "axios";
import { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } from "../../env/variables.js";


const getAccessToken = async () => {
    try {
        const response = await axios.post(
            'https://zoom.us/oauth/token',
            null,
            {
                params: {
                    grant_type: 'account_credentials',
                    account_id: ZOOM_ACCOUNT_ID,
                },
                auth: {
                    username: ZOOM_CLIENT_ID,
                    password: ZOOM_CLIENT_SECRET,
                },
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error('Error generating access token:', error.response.data);
        throw new Error('Failed to generate Zoom access token');
    }
};
export { getAccessToken };
