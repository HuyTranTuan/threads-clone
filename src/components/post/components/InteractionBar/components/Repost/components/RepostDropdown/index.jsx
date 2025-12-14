import { Repeat, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import AnimatedCounter from "@/components/AnimatedCounter";
import { cn } from "@/lib/utils.js";

export function RepostDropdown({
  post,
  count,
  isAuthenticated,
  onRepost,
  onQuote,
  onShowLoginDialog,
  isEmbedView = false,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { t } = useTranslation();

  const handleOpenChange = (open) => {
    if (isEmbedView) return;

    // If trying to open and not authenticated, show login dialog instead
    if (open && !isAuthenticated) {
      onShowLoginDialog();
      return;
    }
    // Otherwise, just set the dropdown state directly
    setDropdownOpen(open);
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild className="p-0" disabled={isEmbedView}>
        <button
          className={cn(
            "flex items-center gap-1 p-1.5 w-[50px] justify-start transition-colors",
            isEmbedView
              ? "pointer-events-none cursor-default"
              : "cursor-pointer",
            post.is_reposted_by_auth
              ? isEmbedView
                ? "text-blue-500"
                : "text-blue-500 hover:text-blue-400"
              : isEmbedView
                ? "text-muted-foreground"
                : "text-muted-foreground hover:text-foreground",
          )}
          disabled={isEmbedView}
        >
          <Repeat className="w-5 h-5" />
          <AnimatedCounter value={count} className="text-sm" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="min-w-[180px] rounded-xl bg-background! p-3! border! border-(--systemtext)!"
      >
        <DropdownMenuItem
          className="flex items-center justify-between cursor-pointer px-3! py-2.5! rounded-md hover:bg-secondary transition-colors duration-150"
          onClick={onRepost}
        >
          <span className="font-medium">{t("repost")}</span>
          <Repeat className="w-5 h-5" />
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem
          className="flex items-center justify-between cursor-pointer px-3! py-2.5! rounded-md hover:bg-secondary transition-colors duration-150"
          onClick={onQuote}
        >
          <span className="font-medium">{t("quote")}</span>
          <Quote className="w-5 h-5" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
