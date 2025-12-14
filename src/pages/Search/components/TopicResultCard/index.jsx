import { useTranslation } from "react-i18next";
import { Hash } from "lucide-react";

function TopicResultCard({ topic }) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-3! p-4! hover:bg-secondary/30 transition-colors cursor-pointer">
      {/* Topic Icon */}
      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
        <Hash className="h-5 w-5 text-muted-foreground" />
      </div>

      {/* Topic Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm">{topic.name}</p>
        {topic.description && (
          <p className="text-sm text-muted-foreground line-clamp-1">
            {topic.description}
          </p>
        )}
        <p className="text-sm text-muted-foreground mt-0.5!">
          {t("posts", { count: topic.posts_count || 0 })}
        </p>
      </div>
    </div>
  );
}

export default TopicResultCard;
