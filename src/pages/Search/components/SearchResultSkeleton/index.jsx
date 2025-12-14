import { Skeleton } from "@/components/ui/skeleton";

function SearchResultSkeleton({ type = "user" }) {
  return (
    <div className="flex items-start gap-3 p-4">
      {/* Avatar/Icon skeleton */}
      <Skeleton className="h-10 w-10 rounded-full shrink-0" />

      {/* Content skeleton */}
      <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
        {type === "user" && <Skeleton className="h-3 w-20" />}
      </div>

      {/* Button skeleton (only for user) */}
      {type === "user" && <Skeleton className="h-8 w-20 rounded-xl shrink-0" />}
    </div>
  );
}

export default SearchResultSkeleton;
