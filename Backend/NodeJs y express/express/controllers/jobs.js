import { JobModel } from "../models/jobs.js";

export class JobController {
   static async getAll(req, res) {
      const {
         text,
         title,
         level,
         type,
         limit = DEFAULTS.LIMIT_PAGINATION,
         offset = DEFAULTS.LIMIT_OFFSET,
         technology,
      } = req.query;

      const {
         data,
         total,
         limit: limitNumber,
         offset: offsetNumber,
      } = await JobModel.getAll({
         text,
         title,
         level,
         type,
         limit,
         offset,
         technology,
      });

      return res.json({
         data,
         total,
         limit: limitNumber,
         offset: offsetNumber,
      });
   }

   static async getId(req, res) {
      const { id } = req.params;

      const job = await JobModel.getById(id);

      if (!job) {
         return res.status(404).json({ message: "Job not found" });
      }

      return res.json(job);
   }

   static async create(req, res) {
      const { title, company, location, data } = req.body;

      const newJob = await JobModel.create({
         title,
         company,
         location,
         data,
      });

      return res.status(201).json(newJob);
   }

   static async update(req, res) {
      // Extraemos el id de los parámetros de la URL
      const { id } = req.params;

      // Extraemos los datos del body enviado por el cliente
      const { title, company, location, data } = req.body;

      const updatedJob = await JobModel.update({
         id,
         title,
         company,
         location,
         data,
      });

      return res.json(updatedJob);
   }

   static async partialUpdate(req, res) {
      // Extraemos el id de los parámetros de la URL
      const { id } = req.params;

      // Extraemos los datos del body enviado por el cliente
      const { title, company, location, data } = req.body;

      const updatedJob = await JobModel.partialUpdate({
         id,
         title,
         company,
         location,
         data,
      });

      return res.json(updatedJob);
   }
}
