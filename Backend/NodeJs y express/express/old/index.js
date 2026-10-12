import express from "express";
import { DEFAULTS } from "../config.js";
import jobs from "../jobs.json" with { type: "json" };
import cors from "cors";

const PORT = process.env.PORT ?? DEFAULTS.PORT;

const app = express();

const ACCEPTED_ORIGINS = [
   "http://localhost:3000",
   "https://midu.dev",
   "http://localhost:5173",
];

app.use(
   cors({
      origin: (origin, callback) => {
         if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true);
         }

         return callback(new Error("Origen no permitido"));
      },
   }),
);

app.use(express.json());

app.use((req, res, next) => {
   const timestring = new Date().toLocaleString();
   console.log(`${timestring} ${req.method} ${req.url}`);
   next();
});

app.get("/", (req, res) => {
   res.send("<h1>Hello World</h1>");
});

app.get("/health", (req, res) => {
   return res.json({ status: "ok", uptime: process.uptime() });
});

app.get("/jobs", (req, res) => {
   const {
      text,
      title,
      level,
      type,
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
            (job.descripcion?.toLowerCase().includes(searchTerm) ?? false),
      );
   }

   if (type) {
      filteredJobs = filteredJobs.filter((job) => job.data.modalidad === type);
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

   return res.json({
      data: paginatedJobs,
      total: filteredJobs.length,
      limit: limitNumber,
      offset: offsetNumber,
   });
});

app.get("/jobs/:id", (req, res) => {
   const { id } = req.params;

   const job = jobs.find((job) => job.id === id);

   if (!job) {
      return res.status(404).json({ message: "Job not found" });
   }

   return res.json(job);
});

app.post("/jobs", (req, res) => {
   // Extraemos los datos del body enviado por el cliente
   const { titulo, empresa, ubicacion, data } = req.body; // data es un objeto

   // Creamos un nuevo objeto con los datos recibidos
   // y lo añadimos a la lista de jobs
   const newJob = {
      // id es un campo obligatorio
      id: crypto.randomUUID(), // generamos un id aleatorio
      titulo, // titulo es un campo obligatorio
      empresa, // empresa es un campo obligatorio
      ubicacion, // ubicacion es un campo opcional
      data, // data es un campo obligatorio
   };

   jobs.push(newJob);

   return res.status(201).json(newJob);
});

app.put("/jobs/:id", (req, res) => {
   // Extraemos el id de los parámetros de la URL
   const { id } = req.params;

   // Buscamos el índice del trabajo en la lista
   const jobIndex = jobs.findIndex((job) => job.id === id);

   if (jobIndex === -1) {
      return res.status(404).json({ message: "Job not found" });
   }

   // Extraemos los datos del body enviado por el cliente
   const { titulo, empresa, ubicacion, data } = req.body;

   // Creamos el objeto reemplazando el trabajo anterior
   const updatedJob = {
      id, // Conservamos el id original
      titulo,
      empresa,
      ubicacion,
      data,
   };

   // Reemplazamos el trabajo en la lista
   jobs[jobIndex] = updatedJob;

   return res.json(updatedJob);
});

app.patch("/jobs/:id", (req, res) => {
   // Extraemos el id de los parámetros de la URL
   const { id } = req.params;

   // Buscamos el trabajo por su id
   const jobIndex = jobs.findIndex((job) => job.id === id);

   if (jobIndex === -1) {
      return res.status(404).json({ message: "Job not found" });
   }

   // Extraemos los datos del body enviado por el cliente
   const { titulo, empresa, ubicacion, data } = req.body;

   // Obtenemos el trabajo actual
   const currentJob = jobs[jobIndex];

   // Creamos un objeto combinando los datos actuales con los nuevos
   const updatedJob = {
      ...currentJob,
      ...(titulo !== undefined && { titulo }),
      ...(empresa !== undefined && { empresa }),
      ...(ubicacion !== undefined && { ubicacion }),
      ...(data !== undefined && { data }),
   };

   // Actualizamos el trabajo en la lista
   jobs[jobIndex] = updatedJob;

   return res.json(updatedJob);
});

app.listen(PORT, () => {
   console.log(`Server is running on port http://localhost:${PORT}`);
});
