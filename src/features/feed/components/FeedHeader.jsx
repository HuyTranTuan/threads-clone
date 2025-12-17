import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { cn } from "@/lib/utils";
import { removeColumn, selectSavedColumn } from "@/features/columns";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "@/components/ui/icons/lucide-trash-2";

const FeedHeader = ({ currentFeedType, onFeedTypeChange, index }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentColumns = useSelector(selectSavedColumn);
  const currentColumnsLength = currentColumns.length;

  const handldeDeleteColumn = (index) => {
    dispatch(removeColumn(index));
  };
  return (
    <header className="h-15 bg-background/95 backdrop-blur-md relative">
      <div className="h-full flex items-center justify-center gap-8 px-6 relative z-10">
        <button
          onClick={() => onFeedTypeChange(currentFeedType)}
          className={cn(
            "relative py-4 px-2 text-base font-semibold transition-colors",
            currentFeedType === "for_you"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {t(`${currentFeedType}`)}
        </button>
      </div>
      {currentColumnsLength > 1 && (
        <Button
          className="p-2! rounded-full absolute top-1/2 right-2.5 transform -translate-y-1/2 bg-red-800 hover:bg-red-500 z-20"
          onClick={() => handldeDeleteColumn(index)}
        >
          <Trash2Icon className="" />
        </Button>
      )}
    </header>
  );
};
export default FeedHeader;
