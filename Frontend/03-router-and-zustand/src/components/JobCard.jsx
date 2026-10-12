import { useState } from "react";
import { Link } from "./Link";
import styles from "./JobCard.module.css";
import { useFavoritesStore } from "../store/favoritesStore";
import { useAuthStore } from "../store/authStore";

function JobCardFavoriteButton({ jobId }) {
   const { isLoggedIn } = useAuthStore();
   const { toggleFavorite, isFavorite } = useFavoritesStore();
   const fav = isFavorite(jobId);

   return (
      <button
         className="icon-btn"
         disabled={!isLoggedIn}
         onClick={() => toggleFavorite(jobId)}
         aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
         aria-pressed={fav}
      >
         {fav ? "❤️" : "🤍"}
      </button>
   );
}

function JobCardApplyButton({ jobId }) {
   const [isApplied, setIsApplied] = useState(false);
   const { isLoggedIn } = useAuthStore();

   const handleApplyClick = () => {
      setIsApplied(true);
   };

   return (
      <button
         disabled={!isLoggedIn || isApplied}
         className={`btn btn-sm btn-primary button-apply-job${isApplied ? " is-applied" : ""}`}
         onClick={handleApplyClick}
      >
         {isApplied ? "Aplicado" : "Aplicar"}
      </button>
   );
}

function techList(job) {
   const tech = job.data?.technology;
   if (Array.isArray(tech)) return tech.slice(0, 3);
   if (typeof tech === "string") return [tech];
   return [];
}

export function JobCard({ job }) {
   return (
      <article className="job-listing-card">
         <div>
            <h3>
               <Link className={styles.title} href={`/jobs/${job.id}`}>
                  {job.title}
               </Link>
            </h3>
            <small>
               {job.company} | {job.location}
            </small>
            <p>{job.description}</p>
            <div className="badges">
               <span className="badge badge-accent">{job.data.mode}</span>
               <span className="badge">{job.data.level}</span>
               {techList(job).map((t) => (
                  <span key={t} className="badge">{t}</span>
               ))}
            </div>
         </div>
         <div className={styles.actions}>
            <JobCardApplyButton jobId={job.id} />
            <JobCardFavoriteButton jobId={job.id} />
            <Link href={`/jobs/${job.id}`} className={styles.details}>
               Ver detalles
            </Link>
         </div>
      </article>
   );
}
