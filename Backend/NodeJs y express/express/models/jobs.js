import jobs from "../jobs.json" with { type: "json" };
import { DEFAULTS } from "../config.js";

export class JobModel {
   static async getAll({
      text,
      title,
      level,
      type,
      limit = DEFAULTS.LIMIT_PAGINATION,
      offset = DEFAULTS.LIMIT_OFFSET,
      technology,
   }) {
      let filteredJobs = jobs;
      if (text) {
         const searchTerm = text.toLowerCase();

         filteredJobs = filteredJobs.filter(
            (job) =>
               job.title.toLowerCase().includes(searchTerm) ||
               (job.description?.toLowerCase().includes(searchTerm) ?? false),
         );
      }

      if (type) {
         filteredJobs = filteredJobs.filter(
            (job) => job.data.mode === type,
         );
      }

      if (technology) {
         filteredJobs = filteredJobs.filter((job) =>
            job.data.technology.includes(technology),
         );
      }

      if (title) {
         filteredJobs = filteredJobs.filter((job) =>
            job.title.includes(title),
         );
      }

      if (level) {
         filteredJobs = filteredJobs.filter((job) => job.data.level === level);
      }

      const limitNumber = parseInt(limit, 10);
      const offsetNumber = parseInt(offset, 10);

      const paginatedJobs = filteredJobs.slice(
         offsetNumber,
         offsetNumber + limitNumber,
      );

      return {
         data: paginatedJobs,
         total: filteredJobs.length,
         limit: limitNumber,
         offset: offsetNumber,
      };
   }

   static async create({ title, company, location, data }) {
      const newJob = {
         // id es un campo obligatorio
         id: crypto.randomUUID(), // generamos un id aleatorio
         title,
         company,
         location, // location es opcional
         data, // data es un campo obligatorio
      };

      jobs.push(newJob);

      return newJob;
   }

   static async getById(id) {
      const job = jobs.find((job) => job.id === id);

      if (!job) {
         return null;
      }

      return job;
   }

   static async update({ id, title, company, location, data }) {
      // Buscamos el índice del trabajo en la lista
      const jobIndex = jobs.findIndex((job) => job.id === id);

      if (jobIndex === -1) {
         return res.status(404).json({ message: "Job not found" });
      }

      // Creamos el objeto reemplazando el trabajo anterior
      const updatedJob = {
         id, // Conservamos el id original
         title,
         company,
         location,
         data,
      };

      // Reemplazamos el trabajo en la lista
      jobs[jobIndex] = updatedJob;

      return updatedJob;
   }

   static async partialUpdate({ id, title, company, location, data }) {
      // Buscamos el trabajo por su id
      const jobIndex = jobs.findIndex((job) => job.id === id);

      if (jobIndex === -1) {
         return res.status(404).json({ message: "Job not found" });
      }

      // Obtenemos el trabajo actual
      const currentJob = jobs[jobIndex];

      // Creamos un objeto combinando los datos actuales con los nuevos
      const updatedJob = {
         ...currentJob,
         ...(title !== undefined && { title }),
         ...(company !== undefined && { company }),
         ...(location !== undefined && { location }),
         ...(data !== undefined && { data }),
      };

      // Actualizamos el trabajo en la lista
      jobs[jobIndex] = updatedJob;

      return updatedJob;
   }
}
