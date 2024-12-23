import express from "express"
export const zoomRoutes = express.Router();
import * as zoomController from "../controllers/zoom.controller.js"
import { catchAsyncErrors } from "../utils/helpers.common.js";

zoomRoutes.post("/create-meeting", catchAsyncErrors(zoomController.createMeeting))