import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";

import { setInitialLikesCount } from "@/features/post/postSlice";
import PostCard from "@/components/post/PostCard";
import CreatePostCard from "@/pages/Home/components/CreatePostCard";
import { selectIsAuthenticated } from "@/features/auth";
import { cn } from "@/lib/utils";

const FeedList = ({ posts, fetchMorePosts, hasMore, column }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (posts && posts.length > 0) {
      dispatch(setInitialLikesCount(posts));
    }
  }, [posts, dispatch]);

  return (
    <div className="relative border-2! border-(--systemtext)! p-1.5! rounded-t-2xl! h-full">
      <div className="bg-card rounded-t-2xl border-r border-t border-border h-full">
        {isAuthenticated ? <CreatePostCard /> : <></>}
        <div
          id={column}
          className={cn(
            "overflow-y-auto!",
            isAuthenticated ? "h-[calc(100%-70px)]" : "h-full ",
          )}
        >
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMorePosts}
            hasMore={hasMore}
            loader={
              <div className="text-center py-6!">
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("loading")}
                </p>
              </div>
            }
            endMessage={
              posts.length > 0 && (
                <div className="text-center py-6! text-sm text-muted-foreground">
                  {t("cannot_load_more")}
                </div>
              )
            }
            scrollableTarget={column}
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
    </div>
  );
};
export default FeedList;
