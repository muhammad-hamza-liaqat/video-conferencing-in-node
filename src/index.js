import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import cors from "cors";
const app = express();

import { corsOptions } from "./config/corsSetting.js"
import { requestLogger } from "./middleware/requestLogger.js";
import { myRoutes } from "./routes/index.routes.js";
import { PORT } from "./env/variables.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(requestLogger)
app.use(express.json())
app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname, "public")));
app.use("/", myRoutes)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "127.0.0.1", () => {
    console.info(`server is running at http://127.0.0.1:${PORT}`)
})