import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectIsAuthenticated } from "@/features/auth";
import { RepostDropdown } from "@/components/post/components/InteractionBar/components/Repost/components/RepostDropdown";
import { interactionsServices } from "@/services";
import { updatePost } from "@/features/feed";
import {
  updatePostDetailRepost,
  updateReplyRepost,
} from "@/features/postDetail";
import CreatePostDialog from "@/components/CreatePostDialog";
import SignUpModal from "@/features/auth/components/SignUpModal";

export default function Repost({ count, post, isEmbedView = false }) {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [quoteDialogData, setQuoteDialogData] = useState(null);
  const handleRepost = async () => {
    const response = await interactionsServices.repost(post.id);
    const payload = {
      postId: post.id,
      reposts_and_quotes_count: response.reposts_and_quotes_count,
      is_reposted_by_auth: response.is_reposted,
    };
    // Update both postsSlice (for Home page) and postDetailSlice (for PostDetail page)
    dispatch(updatePost(payload));
    dispatch(updatePostDetailRepost(payload));
    dispatch(updateReplyRepost(payload));
  };

  const handleQuote = () => {
    setQuoteDialogData(post);
  };

  return (
    <>
      <RepostDropdown
        count={count}
        isAuthenticated={isAuthenticated}
        onShowLoginDialog={() => setIsDialogOpen(true)}
        onRepost={handleRepost}
        onQuote={handleQuote}
        post={post}
        isEmbedView={isEmbedView}
      />

      <SignUpModal open={isDialogOpen} onOpenChange={setIsDialogOpen} />

      <CreatePostDialog
        open={!!quoteDialogData}
        onOpenChange={(open) => !open && setQuoteDialogData(null)}
        quotedPost={quoteDialogData}
        mode="quote"
      />
    </>
  );
}
