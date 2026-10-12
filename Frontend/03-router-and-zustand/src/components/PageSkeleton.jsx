import { Skeleton } from "./Skeleton";

export function PageSkeleton() {
   return (
      <div className="page-skeleton" role="status" aria-label="Cargando página">
         <Skeleton style={{ width: "40%", height: "2rem" }} />
         <Skeleton style={{ width: "100%", height: "0.875rem" }} />
         <Skeleton style={{ width: "90%", height: "0.875rem" }} />
         <Skeleton style={{ width: "60%", height: "0.875rem" }} />
      </div>
   );
}
