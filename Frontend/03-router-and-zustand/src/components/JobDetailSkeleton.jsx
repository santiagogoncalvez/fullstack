import { Skeleton } from "./Skeleton";

const SECTIONS = [0, 1, 2, 3];

export function JobDetailSkeleton() {
   return (
      <>
         <Skeleton style={{ width: "10rem", height: "0.875rem" }} />
         <div>
            <Skeleton style={{ width: "60%", height: "2rem" }} />
            <Skeleton style={{ width: "45%", height: "1rem", marginTop: "var(--space-2)" }} />
         </div>
         {SECTIONS.map((i) => (
            <div key={i}>
               <Skeleton style={{ width: "12rem", height: "1.125rem", marginBottom: "var(--space-3)" }} />
               <Skeleton style={{ width: "100%", height: "0.875rem" }} />
               <Skeleton style={{ width: "100%", height: "0.875rem", marginTop: "var(--space-2)" }} />
               <Skeleton style={{ width: "70%", height: "0.875rem", marginTop: "var(--space-2)" }} />
            </div>
         ))}
      </>
   );
}
