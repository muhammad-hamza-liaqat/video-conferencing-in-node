import express from "express"
import { zoomRoutes } from "./zoom.routes.js";
export const indexRoutes = express.Router();

indexRoutes.use("/zoom", zoomRoutes)