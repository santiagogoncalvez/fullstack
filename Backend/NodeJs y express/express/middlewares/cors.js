import express from "express";
import cors from "cors";

const ACCEPTED_ORIGINS = [
   "http://localhost:3000",
   "https://midu.dev",
   "http://localhost:5173",
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
   return cors({
      origin: (origin, callback) => {
         // Sin origin: curl, scripts, server-to-server
         if (!origin || acceptedOrigins.includes(origin)) {
            return callback(null, true);
         }

         return callback(new Error("Origen no permitido"));
      },
   });
};
