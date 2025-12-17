import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import FeedHeader from "@/features/feed/components/FeedHeader";
import FeedList from "@/features/feed/components/FeedList";
import {
  setPosts,
  appendPosts,
  setLoading,
  setError,
  setHasMore,
  incrementPage,
} from "@/features/feed/feedSlice";
import {
  restoreLikedPostsFromFeed,
  restoreLikedPostsFromStorage,
} from "@/features/post/postSlice";
import {
  selectFeedLoading,
  selectHasMore,
  selectPage,
  selectPosts,
} from "@/features/feed";
import { postService } from "@/services";
import Loading from "@/components/Loading";
import { addColumn, selectSavedColumn } from "@/features/columns";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { selectIsAuthenticated } from "@/features/auth";
import { cn } from "@/lib/utils";

const Home = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const posts = useSelector(selectPosts);
  const loading = useSelector(selectFeedLoading);
  const hasMore = useSelector(selectHasMore);
  const currentPage = useSelector(selectPage);
  const currentColumns = useSelector(selectSavedColumn);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [currentFeedType, setCurrentFeedType] = useState("for_you");

  //Load post khi scroll đến cuối trang
  const fetchMorePosts = async () => {
    if (loading || !hasMore) return;

    dispatch(setLoading(true));

    try {
      const nextPage = currentPage + 1;
      const response = await postService.getFeed(currentFeedType, nextPage);

      const newPosts = response.data || [];
      const pagination = response.pagination;

      //Thêm post mới vào cuối danh sách
      dispatch(appendPosts(newPosts));
      // Restore liked posts từ API response cho posts mới
      dispatch(restoreLikedPostsFromFeed(newPosts));
      dispatch(incrementPage());

      //Check xem còn Page kế tiếp không?
      if (pagination) {
        const hasNextPage = pagination.current_page < pagination.last_page;
        dispatch(setHasMore(hasNextPage));
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || t("cannot_load_more");

      dispatch(setError(errorMessage));
      toast.error(t("cannot_load_more"), {
        description: errorMessage,
      });
    }
  };

  const handldeAddColumn = (column) => {
    dispatch(addColumn(column));
  };

  // Restore liked posts từ localStorage khi component mount
  useEffect(() => {
    dispatch(restoreLikedPostsFromStorage());
  }, [dispatch]);

  // Fetch lần đầu Page 1 posts từ API
  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));

      try {
        const response = await postService.getFeed(currentFeedType, 1);

        // Lấy data từ response
        const feedPosts = response.data || [];
        const pagination = response.pagination;

        dispatch(setPosts(feedPosts));
        dispatch(restoreLikedPostsFromFeed(feedPosts));

        //Check còn page không?
        if (pagination) {
          const hasNextPage = pagination.current_page < pagination.last_page;
          dispatch(setHasMore(hasNextPage));
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || t("cannot_load_post_retry");

        dispatch(setError(errorMessage));

        toast.error(t("fetch_feed_error"), {
          description: errorMessage,
        });
      }
    })();
  }, [dispatch, currentFeedType]);

  return (
    <div
      id="Home"
      className={cn(
        "w-[calc(100%-50px)] h-full! flex gap-5! overflow-x-auto items-center px-6! md:px-0!",
        currentColumns.length >= 3 ? "" : "justify-center",
        !isAuthenticated ? " max-w-[700px]!" : "",
      )}
    >
      {isAuthenticated ? (
        currentColumns.map((column, index) => (
          <div
            className="w-full! h-full md:min-w-[380px] md:max-w-[700px] relative"
            key={index}
          >
            <FeedHeader
              currentFeedType={column}
              onFeedTypeChange={setCurrentFeedType}
              index={index}
            />
            <div className="h-[calc(100%-50px)]! md:h-[calc(100%-60px)]!">
              {loading && posts.length === 0 ? (
                <Loading />
              ) : (
                <FeedList
                  posts={posts}
                  fetchMorePosts={fetchMorePosts}
                  hasMore={hasMore}
                  loading={loading}
                  column={column}
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="w-full! h-full md:min-w-[380px] relative">
          <FeedHeader
            currentFeedType={currentFeedType}
            onFeedTypeChange={setCurrentFeedType}
          />
          <div className="h-[calc(100%-50px)]! md:h-[calc(100%-70px)]!">
            {loading && posts.length === 0 ? (
              <Loading />
            ) : (
              <FeedList
                posts={posts}
                fetchMorePosts={fetchMorePosts}
                hasMore={hasMore}
                loading={loading}
              />
            )}
          </div>
        </div>
      )}
      {isAuthenticated && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full p-2!">
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit p-2.5!" align="start">
            <DropdownMenuItem
              className="p-2!"
              onClick={() => handldeAddColumn("for_you")}
            >
              Add For you
            </DropdownMenuItem>
            <DropdownMenuItem
              className="p-2!"
              onClick={() => handldeAddColumn("following")}
            >
              Add Following
            </DropdownMenuItem>
            <DropdownMenuItem
              className="p-2!"
              onClick={() => handldeAddColumn("ghost_posts")}
            >
              Add Ghost posts
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
export default Home;
