import { Heart } from "lucide-react";
import { Link } from "./Link";
import styles from "./JobCard.module.css";
import { useFavoritesStore } from "../store/favoritesStore";

function JobCardFavoriteButton({ jobId }) {
   const { toggleFavorite, isFavorite } = useFavoritesStore();
   const fav = isFavorite(jobId);

   return (
      <button
         className={`icon-btn${fav ? " is-active" : ""}`}
         onClick={() => toggleFavorite(jobId)}
         aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
         aria-pressed={fav}
      >
         <Heart size={18} fill={fav ? "currentColor" : "none"} />
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
               {job.company} · {job.location}
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
            <JobCardFavoriteButton jobId={job.id} />
         </div>
      </article>
   );
}
