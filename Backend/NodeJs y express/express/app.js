import express from "express";
import { DEFAULTS } from "./config.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { jobsRouter } from "./routes/jobs.js";

const PORT = process.env.PORT ?? DEFAULTS.PORT;

const app = express();

app.use(corsMiddleware());
app.use(express.json());

app.use("/jobs", jobsRouter);

app.listen(PORT, () => {
   console.log(`Server is running on port http://localhost:${PORT}`);
});
