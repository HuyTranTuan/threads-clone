import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

function PostCardSkeleton() {
  return (
    <Card className="bg-content-background border-border py-2 shadow-none rounded-none border-0 border-b">
      <CardContent className="p-2">
        <div className="flex gap-3">
          {/* Avatar Skeleton - hình tròn */}
          <Skeleton className="w-10 h-10 rounded-full shrink-0" />

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            {/* Header - Username & Timestamp */}
            <div className="flex items-center gap-2 mb-2">
              {/* Username skeleton - chiều rộng ngẫu nhiên */}
              <Skeleton className="h-4 w-30" />
            </div>

            {/* Post Text - 2-3 dòng */}
            <div className="space-y-2 mb-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PostCardSkeleton;
