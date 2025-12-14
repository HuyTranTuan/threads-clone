import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

import PostCard from "@/components/post/PostCard";
import PostCardSkeleton from "@/components/post/components/PostCardSkeleton";
import {
  getPost,
  getPostReplies,
  clearPostDetail,
  addReply,
} from "@/features/postDetail/postDetailSlice";
import InfiniteScrollLoader from "@/components/InfiniteScrollLoader";
import ReplyCard from "./components/ReplyCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PostDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("newest"); // 'newest' or 'most_liked'

  const { post, replies, repliesPagination, loading, repliesLoading } =
    useSelector((state) => state.postDetail);

  const hasMoreReplies =
    repliesPagination.current_page < repliesPagination.last_page;

  useEffect(() => {
    // Scroll to top when entering PostDetail
    window.scrollTo(0, 0);

    if (id) {
      dispatch(getPost(id));
      dispatch(getPostReplies({ id, page: 1, sort: sortBy }));
    }

    return () => {
      dispatch(clearPostDetail());
    };
  }, [dispatch, id, sortBy]);

  const handleLoadMoreReplies = () => {
    if (!repliesLoading && hasMoreReplies) {
      const nextPage = repliesPagination.current_page + 1;
      dispatch(getPostReplies({ id, page: nextPage, sort: sortBy }));
    }
  };

  const handleReplySuccess = (newReply) => {
    dispatch(addReply(newReply));
  };

  const handleSortChange = (newSort) => {
    if (newSort !== sortBy) {
      setSortBy(newSort);
    }
  };

  const getSortLabel = () => {
    return sortBy === "newest" ? t("newest") : t("most_liked");
  };

  return (
    <div
      className="w-full! md:w-[calc(100%-80px)]! flex justify-center px-6! md:px-0!"
      id="PostDetail"
    >
      <div className="w-full! md:min-w-[380px] md:max-w-[700px]! h-100vh! rounded-t-2xl border! border-(--systemtext)! p-5! mt-4!">
        {/* Main Post */}
        {loading ? (
          <PostCardSkeleton />
        ) : post ? (
          <PostCard
            post={post}
            isDetailView
            onReplySuccess={handleReplySuccess}
            isFirst={true}
          />
        ) : null}

        {/* Filter Bar - Divider between Post and Replies */}
        {!loading && post && (
          <div className="flex items-center justify-between px-4! py-3! border-b! border-card-borde! bg-content-background!">
            <span className="font-semibold! text-foreground">
              {t("replies")}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors outline-none">
                  <span>{getSortLabel()}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-sm! bg-content-background! p-3!"
              >
                <DropdownMenuItem
                  className={`cursor-pointer px-3! py-2! ${sortBy === "newest" ? "font-semibold!" : ""}`}
                  onClick={() => handleSortChange("newest")}
                >
                  {t("newest")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`cursor-pointer px-3! py-2! ${sortBy === "most_liked" ? "font-semibold" : ""}`}
                  onClick={() => handleSortChange("most_liked")}
                >
                  {t("most_liked")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Replies Section */}
        <div className="mt-3! w-full! bg-background!">
          <InfiniteScrollLoader
            onLoadMore={handleLoadMoreReplies}
            hasMore={hasMoreReplies}
            loading={repliesLoading && replies.length > 0}
            LoadingComponent={PostCardSkeleton}
            loadingCount={2}
            endMessage={replies.length > 0 ? t("no_more_reply") : ""}
            triggerMargin="100px"
          >
            {repliesLoading && replies.length === 0
              ? Array.from({ length: 3 }).map((_, index) => (
                  <PostCardSkeleton key={`reply-skeleton-${index}`} />
                ))
              : replies.map((reply) => (
                  <ReplyCard key={reply.id} reply={reply} />
                ))}
          </InfiniteScrollLoader>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
