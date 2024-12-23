import express from "express"
import { agoraRoutes } from "./agora.routes.js"
export const myRoutes = express.Router()


myRoutes.use("/agora", agoraRoutes)