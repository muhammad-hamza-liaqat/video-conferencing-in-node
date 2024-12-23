import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
export const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
export const ZOOM_REDIRECT_URI = process.env.ZOOM_REDIRECT_URI
export const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;