import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";

import { setInitialLikesCount } from "@/features/post/postSlice";
import PostCard from "@/components/post/PostCard";
import CreatePostCard from "@/pages/Home/components/CreatePostCard";

const FeedList = ({ posts, fetchMorePosts, hasMore, loading }) => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const { t } = useTranslation();
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [containerWidth, setContainerWidth] = useState(720);

  useEffect(() => {
    if (posts && posts.length > 0) {
      dispatch(setInitialLikesCount(posts));
    }
  }, [posts, dispatch]);

  useEffect(() => {
    const updateOffset = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setOffsetLeft(rect.left);
        setContainerWidth(rect.width);
      }
    };

    // Đảm bảo tính toán sau khi layout hoàn tất
    const timeoutId = setTimeout(updateOffset, 0);

    // Tính toán lại khi resize
    window.addEventListener("resize", updateOffset);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateOffset);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative border-2! border-(--systemtext)! p-1.5! rounded-t-2xl! "
    >
      <div className="bg-card rounded-t-2xl border-r border-t border-border">
        <CreatePostCard />
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMorePosts}
          hasMore={hasMore}
          loader={
            <div className="text-center py-6">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("loading")}
              </p>
            </div>
          }
          endMessage={
            posts.length > 0 && (
              <div className="text-center py-6 text-sm text-muted-foreground">
                {t("cannot_load_more")}
              </div>
            )
          }
        >
          {posts && posts.length > 0 ? (
            posts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                isFirst={index === 0}
                isLast={index === posts.length - 1}
              />
            ))
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              {t("no_post_yet")}
            </div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};
export default FeedList;
