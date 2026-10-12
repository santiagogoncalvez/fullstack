import { useLocation } from "react-router";
import { SearchPageSkeleton } from "./SearchPageSkeleton";
import { JobDetailPageSkeleton } from "./JobDetailPageSkeleton";
import { PageSkeleton } from "./PageSkeleton";

export function RouteFallback() {
   const { pathname } = useLocation();

   if (pathname === "/search") return <SearchPageSkeleton />;
   if (pathname.startsWith("/jobs/")) return <JobDetailPageSkeleton />;
   return <PageSkeleton />;
}
