import express from "express";
import cors from "cors";

import { corsOptions } from "./config/corsSetting.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { PORT } from "./env/variables.js";
import { indexRoutes } from "./routes/index.routes.js";

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api", indexRoutes);
app.get("/", (req, res) => {
    res.send("Home page of Node.js application");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
    console.info(`Server is running at http://localhost:${PORT}`);
});
