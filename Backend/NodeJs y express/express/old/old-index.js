import express from "express";
import { DEFAULTS } from "../config.js";

const PORT = process.env.PORT ?? DEFAULTS.PORT;

const app = express();

app.use((req, res, next) => {
   const timestring = new Date().toLocaleString();
   console.log(`${timestring} ${req.method} ${req.url}`);
   next();
});

app.get("/", (req, res) => {
   res.send("<h1>Hello World</h1>");
});

app.get("/health", (req, res) => {
   return res.json({ staus: "ok", uptime: process.uptime() });
});

app.get("/jobs", async (req, res) => {
   const { default: jobs } = await import("../jobs.json", {
      with: { type: "json" },
   });

   const {
      text,
      title,
      level,
      limit = DEFAULTS.LIMIT_PAGINATION,
      offset = DEFAULTS.LIMIT_OFFSET,
      technology,
   } = req.query;

   let filteredJobs = jobs;
   if (text) {
      const searchTerm = text.toLowerCase();
      filteredJobs = filteredJobs.filter(
         (job) =>
            job.titulo.toLowerCase().includes(searchTerm) ||
            job.descripcion.toLowerCase().includes(searchTerm),
      );
   }

   if (technology) {
      filteredJobs = filteredJobs.filter((job) =>
         job.data.technology.includes(technology),
      );
   }

   if (title) {
      filteredJobs = filteredJobs.filter((job) => job.titulo.includes(title));
   }

   if (level) {
      filteredJobs = filteredJobs.filter((job) => job.data.nivel === level);
   }

   const limitNumber = parseInt(limit, 10);
   const offsetNumber = parseInt(offset, 10);

   const paginatedJobs = filteredJobs.slice(
      offsetNumber,
      offsetNumber + limitNumber,
   );

   return res.json(paginatedJobs);
});

app.get("/job/:id", (req, res) => {
   const { id } = req.params;
   const jobId = parseInt(id, 10);
   return res.json({
      job: {
         id: jobId,
         title: `Job ${jobId}`,
         description: `This is job ${jobId}`,
      },
   });
});

// Opcional -> /acd o /abcd
app.get("/a{b}cd", (req, res) => {
   return res.json({ message: "abcd o acd" });
});

// Comodín
app.get("/bb*bb", (req, res) => {
   return res.json({ message: "bb*bb" });
});

// Rutas más largas que no sabes cómo terminan
app.get("/file/*filename", (req, res) => {
   return res.json({ message: "file/*" });
});

// Usar regex
app.get(/.*fly$/, (req, res) => {
   return res.json({ message: "Terminate with fly" });
});

app.listen(PORT, () => {
   console.log(`Server is running on port http://localhost:${PORT}`);
});
