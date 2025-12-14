import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const FeedHeader = ({ currentFeedType, onFeedTypeChange }) => {
  const { t } = useTranslation();

  return (
    <header className="h-15 bg-background/95 backdrop-blur-md">
      <div className="h-full flex items-center justify-center gap-8 px-6 relative z-10">
        <button
          onClick={() => onFeedTypeChange("for_you")}
          className={cn(
            "relative py-4 px-2 text-base font-semibold transition-colors",
            currentFeedType === "for_you"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {t("for_you")}
          {currentFeedType === "for_you" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full" />
          )}
        </button>
      </div>
    </header>
  );
};
export default FeedHeader;
