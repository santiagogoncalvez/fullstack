import express from "express";
import { existsSync } from "node:fs";
import { DEFAULTS } from "./config.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { jobsRouter } from "./routes/jobs.js";

// .env local opcional (ver .env.example). No pisa variables ya definidas.
if (existsSync(".env")) {
   process.loadEnvFile();
}

const PORT = process.env.PORT ?? DEFAULTS.PORT;

const app = express();

app.use(corsMiddleware());
app.use(express.json());

app.use("/jobs", jobsRouter);

app.use((req, res) => {
   res.status(404).json({ message: "Not found" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
   console.error(err);

   if (err.type === "entity.parse.failed") {
      return res.status(400).json({ message: "Invalid JSON body" });
   }

   res.status(500).json({ message: "Internal server error" });
});

if (process.env.NODE_ENV !== "production") {
   app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
   });
}

export default app;
