import { config } from "dotenv";
config();

const PORT = process.env.PORT;
const AGORA_APP_ID = process.env.AGORA_APP_ID;
const AGORA_APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE;


export {
    PORT,
    AGORA_APP_CERTIFICATE,
    AGORA_APP_ID
}