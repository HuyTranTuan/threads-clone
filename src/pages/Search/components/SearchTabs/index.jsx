import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const SEARCH_MODES = ["all", "topics", "users"];

function SearchTabs({ activeMode, onChange }) {
  const { t } = useTranslation();

  return (
    <div className="flex border-b border-border">
      {SEARCH_MODES.map((mode) => (
        <button
          key={mode}
          onClick={() => onChange(mode)}
          className={cn(
            "flex-1 py-3 text-sm font-medium transition-colors relative",
            activeMode === mode
              ? "text-foreground"
              : "text-muted-foreground !hover:text-foreground/80",
          )}
        >
          {t(`${mode}`)}
          {activeMode === mode && (
            <span className="absolute bottom-0 left-0! right-0! h-0.5! bg-foreground" />
          )}
        </button>
      ))}
    </div>
  );
}

export default SearchTabs;
