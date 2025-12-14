import { useTranslation } from "react-i18next";

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { EyeOffIcon } from "@/components/ui/icons/lucide-eye-off";
import { UserRoundXIcon } from "@/components/ui/icons/lucide-user-round-x";
import { VolumeOffIcon } from "@/components/ui/icons/lucide-volume-off";
import { BanIcon } from "@/components/ui/icons/lucide-ban";
import { FlagIcon } from "@/components/ui/icons/lucide-flag";
import { BookmarkIcon } from "@/components/ui/icons/lucide-bookmark";

function OthersPostMenuItems({
  postUsername,
  isLoading,
  isSaved,
  onSave,
  onNotInterested,
  onMute,
  onRestrict,
  onBlock,
  onReport,
}) {
  const { t } = useTranslation();

  return (
    <>
      <DropdownMenuSeparator />

      {/* Save / Unsave */}
      <DropdownMenuItem
        className="flex items-center justify-between hover:bg-secondary gap-2 cursor-pointer px-3! py-2.5!"
        onClick={onSave}
        disabled={isLoading}
      >
        <span>{isSaved ? t("unsave") : t("save")}</span>
        {isSaved ? <BookmarkIcon /> : <BookmarkIcon />}
      </DropdownMenuItem>

      {/* Not interested */}
      <DropdownMenuItem
        className="flex items-center justify-between hover:bg-secondary gap-2 cursor-pointer px-3! py-2.5!"
        onClick={onNotInterested}
        disabled={isLoading}
      >
        <span>{t("not_interested")}</span>
        <EyeOffIcon />
      </DropdownMenuItem>

      {/* Mute */}
      <DropdownMenuItem
        className="flex items-center justify-between hover:bg-secondary gap-2 cursor-pointer px-3! py-2.5!"
        onClick={onMute}
        disabled={isLoading}
      >
        <span>{t("mute", { username: postUsername })}</span>
        <VolumeOffIcon />
      </DropdownMenuItem>

      {/* Restrict */}
      <DropdownMenuItem
        className="flex items-center justify-between hover:bg-secondary gap-2 cursor-pointer px-3! py-2.5!"
        onClick={onRestrict}
        disabled={isLoading}
      >
        <span>{t("restrict", { username: postUsername })}</span>
        <UserRoundXIcon />
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      {/* Block - Destructive */}
      <DropdownMenuItem
        className="flex items-center justify-between hover:bg-secondary gap-2 cursor-pointer px-3! py-2.5! text-destructive"
        onClick={onBlock}
        disabled={isLoading}
      >
        <span>{t("block", { username: postUsername })}</span>
        <BanIcon />
      </DropdownMenuItem>

      {/* Report - Destructive */}
      <DropdownMenuItem
        className="flex items-center justify-between hover:bg-secondary gap-2 cursor-pointer px-3! py-2.5! text-destructive"
        onClick={onReport}
        disabled={isLoading}
      >
        <span>{t("report_submit")}</span>
        <FlagIcon />
      </DropdownMenuItem>
    </>
  );
}

export default OthersPostMenuItems;
