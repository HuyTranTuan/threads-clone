import { useTranslation } from "react-i18next";

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { BookmarkIcon } from "@/components/ui/icons/lucide-bookmark";
import { PenLineIcon } from "@/components/ui/icons/lucide-pen-line";
import { Trash2Icon } from "@/components/ui/icons/lucide-trash-2";
import { BookmarkCheckIcon } from "@/components/ui/icons/lucide-bookmark-check";

function OwnPostMenuItems({
  isLoading,
  isEditable,
  isSaved,
  onEdit,
  onDelete,
  onSave,
}) {
  const { t } = useTranslation();

  return (
    <>
      <DropdownMenuSeparator />

      <DropdownMenuItem
        className="flex items-center justify-between hover:bg-secondary gap-2 cursor-pointer px-3! py-2.5!"
        onClick={onSave}
        disabled={isLoading}
      >
        <span>{isSaved ? t("unsave") : t("save")}</span>
        {isSaved ? <BookmarkIcon /> : <BookmarkCheckIcon />}
      </DropdownMenuItem>

      {/* Edit - Only show if editable (within 15 min) */}
      {isEditable && (
        <DropdownMenuItem
          className="flex items-center justify-between hover:bg-secondary gap-2 cursor-pointer px-3! py-2.5!"
          onClick={onEdit}
          disabled={isLoading}
        >
          <span>{t("edit")}</span>
          <PenLineIcon />
        </DropdownMenuItem>
      )}

      {/* Delete - Destructive */}
      <DropdownMenuItem
        className="flex items-center justify-between hover:bg-secondary gap-2 cursor-pointer px-3! py-2.5! text-destructive"
        onClick={onDelete}
        disabled={isLoading}
      >
        <span>{t("delete")}</span>
        <Trash2Icon />
      </DropdownMenuItem>
    </>
  );
}

export default OwnPostMenuItems;
