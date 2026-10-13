import { JobModel } from "../models/jobs.js";
import { DEFAULTS } from "../config.js";

export class JobController {
   static async getAll(req, res) {
      const {
         text,
         level,
         type,
         limit = DEFAULTS.LIMIT_PAGINATION,
         offset = DEFAULTS.LIMIT_OFFSET,
         technology,
      } = req.query;

      const limitNumber = Number(limit);
      const offsetNumber = Number(offset);

      if (
         !Number.isInteger(limitNumber) ||
         !Number.isInteger(offsetNumber) ||
         limitNumber < 1 ||
         offsetNumber < 0
      ) {
         return res
            .status(400)
            .json({ message: "limit and offset must be valid numbers" });
      }

      const {
         data,
         total,
         limit: responseLimit,
         offset: responseOffset,
      } = await JobModel.getAll({
         text,
         level,
         type,
         limit: Math.min(limitNumber, DEFAULTS.MAX_LIMIT_PAGINATION),
         offset: offsetNumber,
         technology,
      });

      return res.json({
         data,
         total,
         limit: responseLimit,
         offset: responseOffset,
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

      if (!title || !company || !data) {
         return res
            .status(400)
            .json({ message: "title, company and data are required" });
      }

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

      if (!title || !company || !data) {
         return res
            .status(400)
            .json({ message: "title, company and data are required" });
      }

      const updatedJob = await JobModel.update({
         id,
         title,
         company,
         location,
         data,
      });

      if (!updatedJob) {
         return res.status(404).json({ message: "Job not found" });
      }

      return res.json(updatedJob);
   }

   static async partialUpdate(req, res) {
      // Extraemos el id de los parámetros de la URL
      const { id } = req.params;

      // Extraemos los datos del body enviado por el cliente
      const { title, company, location, data } = req.body;

      if (
         title === undefined &&
         company === undefined &&
         location === undefined &&
         data === undefined
      ) {
         return res.status(400).json({ message: "nothing to update" });
      }

      const updatedJob = await JobModel.partialUpdate({
         id,
         title,
         company,
         location,
         data,
      });

      if (!updatedJob) {
         return res.status(404).json({ message: "Job not found" });
      }

      return res.json(updatedJob);
   }

   static async delete(req, res) {
      const { id } = req.params;

      const deleted = await JobModel.delete(id);

      if (!deleted) {
         return res.status(404).json({ message: "Job not found" });
      }

      return res.status(204).end();
   }
}
