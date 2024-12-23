import express from "express"
import cors from "cors";
const app = express();

import { corsOptions } from "./config/corsSetting.js"
import { requestLogger } from "./middleware/requestLogger.js";
import { myRoutes } from "./routes/index.routes.js";
import { PORT } from "./env/variables.js"

app.use(requestLogger)
app.use(express.json())
app.use(cors(corsOptions))
app.use("/", myRoutes)

app.get("/", (req, res) => {
    res.end("home page of nodejs application")
})


app.listen(PORT, "127.0.0.1", () => {
    console.info(`server is running at http://127.0.0.1:${PORT}`)
})