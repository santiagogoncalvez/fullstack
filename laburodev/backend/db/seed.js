import fs from "node:fs";
import path from "node:path";
import { db } from "./index.js";

async function seed() {
  try {
    console.log("⏳ Inicializando esquema de base de datos...");
    const schemaPath = path.resolve("db/schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf-8");
    
    // Ejecutar el schema (crear tablas e índices)
    await db.executeMultiple(schemaSql);
    console.log("✅ Esquema creado correctamente.");

    // Verificar si ya existen registros
    const countResult = await db.execute("SELECT COUNT(*) as count FROM jobs");
    const totalJobs = Number(countResult.rows[0].count);

    if (totalJobs > 0) {
      console.log(`ℹ️ La base de datos ya tiene ${totalJobs} empleos. Omitiendo seed.`);
      return;
    }

    console.log("⏳ Importando datos desde jobs.json...");
    const jsonPath = path.resolve("jobs.json");
    if (!fs.existsSync(jsonPath)) {
      console.log("⚠️ No se encontró jobs.json para hacer seed.");
      return;
    }

    const rawData = fs.readFileSync(jsonPath, "utf-8");
    const jobs = JSON.parse(rawData);

    for (const job of jobs) {
      await db.execute({
        sql: `
          INSERT INTO jobs (id, title, company, location, level, description, responsibilities, requirements, about)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          job.id,
          job.title,
          job.company,
          job.location,
          job.data.level,
          job.content.description,
          JSON.stringify(job.content.responsibilities),
          JSON.stringify(job.content.requirements),
          job.content.about,
        ],
      });
    }

    console.log(`✅ Seed completado: Se insertaron ${jobs.length} empleos en SQLite.`);
  } catch (err) {
    console.error("❌ Error durante el seed de la base de datos:", err);
    process.exit(1);
  }
}

seed();
