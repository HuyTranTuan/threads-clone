import { Heart } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cn } from "@/lib/utils";
import { updatePost } from "@/features/feed";
import { selectIsAuthenticated } from "@/features/auth";
import { interactionsServices } from "@/services";
import { updatePostDetailLike, updateReplyLike } from "@/features/postDetail";
import AnimatedCounter from "@/components/AnimatedCounter";
import SignUpModal from "@/features/auth/components/SignUpModal";

export default function Like({ count, post, isEmbedView = false }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleClick = async () => {
    if (isEmbedView) return;

    if (isAuthenticated) {
      const response = await interactionsServices.like(post.id);
      const payload = {
        postId: post.id,
        is_liked_by_auth: response.is_liked,
        likes_count: response.likes_count,
      };
      // Update both postsSlice (for Home page) and postDetailSlice (for PostDetail page)
      dispatch(updatePost(payload));
      dispatch(updatePostDetailLike(payload));
      dispatch(updateReplyLike(payload));
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <button
        className={cn(
          "flex items-center gap-1 transition-colors p-1.5 w-[50px] justify-start",
          isEmbedView ? "pointer-events-none cursor-default" : "cursor-pointer",
          post.is_liked_by_auth
            ? isEmbedView
              ? "text-red-500"
              : "text-red-500 hover:text-red-400"
            : isEmbedView
              ? "text-muted-foreground"
              : "text-muted-foreground hover:text-foreground",
        )}
        onClick={handleClick}
        disabled={isEmbedView}
      >
        <Heart
          className="w-5 h-5"
          fill={post.is_liked_by_auth ? "currentColor" : "none"}
        />
        <AnimatedCounter value={count} className="text-sm" />
      </button>

      <SignUpModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
