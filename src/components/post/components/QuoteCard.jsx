import { formatTimeAgo } from "@/utils/timeFormat";
import AvatarRounded from "./AvatarRounded";

function QuoteCard({ originalPost }) {
  if (!originalPost) return null;

  return (
    <div className="mt-2 mb-2 border border-card-border! rounded-xl p-3 bg-content-background transition-colors">
      {/* Header - Avatar + Username + Time */}
      <div className="flex items-center gap-2 mb-2">
        <AvatarRounded post={originalPost} />

        <span className="font-semibold text-sm text-foreground">
          {originalPost?.user?.username || "username"}
        </span>

        {originalPost?.user?.verified && (
          <svg
            className="w-3.5 h-3.5 text-blue-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        )}

        <span className="text-muted-foreground text-xs">
          {formatTimeAgo(originalPost?.created_at)}
        </span>
      </div>

      {/* Content */}
      <p className="text-sm text-foreground line-clamp-3">
        {originalPost?.content}
      </p>

      {/* Media Preview - nếu có */}
      {originalPost?.media_urls?.length > 0 && (
        <div className="mt-2 rounded-lg overflow-hidden">
          <img
            src={originalPost.media_urls[0]}
            alt="Quoted post media"
            className="w-full h-32 object-cover"
          />
          {originalPost.media_urls.length > 1 && (
            <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              +{originalPost.media_urls.length - 1}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default QuoteCard;
