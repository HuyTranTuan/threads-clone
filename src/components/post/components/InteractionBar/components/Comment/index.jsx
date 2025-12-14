import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

import { selectIsAuthenticated } from "@/features/auth";
import AnimatedCounter from "@/components/AnimatedCounter";
import SignUpModal from "@/features/auth/components/SignUpModal";

export default function Comment({ count, onToggleReply, isEmbedView = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleClick = () => {
    if (isEmbedView) return;

    if (isAuthenticated) {
      onToggleReply();
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <button
        className={`flex items-center gap-1 p-1.5 w-[50px] justify-start text-muted-foreground transition-colors ${
          isEmbedView
            ? "pointer-events-none cursor-default"
            : "hover:text-foreground cursor-pointer"
        }`}
        onClick={handleClick}
        disabled={isEmbedView}
      >
        <MessageCircle className="w-5 h-5" />
        <AnimatedCounter value={count} className="text-sm" />
      </button>

      <SignUpModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
