import { toast } from "sonner";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Send, Link, Code } from "lucide-react";

import { selectIsAuthenticated } from "@/features/auth";
import AnimatedCounter from "@/components/AnimatedCounter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import EmbedModal from "@/components/post/EmbedModal";
import SignUpModal from "@/features/auth/components/SignUpModal";

export default function Share({ post, count, isEmbedView = false }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [embedDialogOpen, setEmbedDialogOpen] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { t } = useTranslation();

  const handleOpenChange = (open) => {
    if (isEmbedView) return;

    // If trying to open and not authenticated, show login dialog instead
    if (open && !isAuthenticated) {
      setIsDialogOpen(true);
      return;
    }
    // Otherwise, just set the dropdown state directly
    setDropdownOpen(open);
  };

  const handleCopyLink = () => {
    // Get base URL including hash prefix for HashRouter
    const baseUrl = window.location.origin + window.location.pathname;
    const postUrl = `${baseUrl}#/post/${post.id}`;
    navigator.clipboard.writeText(postUrl);
    toast.success(t("copied_link"));
  };

  const handleEmbedClick = () => {
    setDropdownOpen(false);
    setEmbedDialogOpen(true);
  };

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild className="p-0" disabled={isEmbedView}>
          <button
            className={`flex items-center gap-1 p-1.5 w-[50px] justify-start text-muted-foreground transition-colors ${
              isEmbedView
                ? "pointer-events-none cursor-default"
                : "hover:text-foreground cursor-pointer"
            }`}
            disabled={isEmbedView}
          >
            <Send className="w-5 h-5" />
            <AnimatedCounter value={count} className="text-sm" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="min-w-[180px] rounded-xl bg-background! p-3! border! border-(--systemtext)!"
        >
          <DropdownMenuItem
            className="flex items-center justify-between cursor-pointer px-3! py-2.5! rounded-md hover:bg-secondary transition-colors duration-150"
            onClick={handleCopyLink}
          >
            <span className="font-medium">{t("copy_link")}</span>
            <Link className="w-5 h-5" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center justify-between cursor-pointer px-3! py-2.5! rounded-md hover:bg-secondary transition-colors duration-150"
            onClick={handleEmbedClick}
          >
            <span className="font-medium">{t("embed")}</span>
            <Code className="w-5 h-5" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SignUpModal open={isDialogOpen} onOpenChange={setIsDialogOpen} />

      <EmbedModal
        open={embedDialogOpen}
        onOpenChange={setEmbedDialogOpen}
        post={post}
        isEmbedView={isEmbedView}
      />
    </>
  );
}
