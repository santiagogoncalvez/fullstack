import { JobCardSkeleton } from "./JobCardSkeleton";

export function SearchResultsSkeleton({ count = 4 }) {
   return (
      <div className="jobs-listings" role="status" aria-label="Cargando empleos">
         {Array.from({ length: count }).map((_, i) => (
            <JobCardSkeleton key={i} />
         ))}
      </div>
   );
}
