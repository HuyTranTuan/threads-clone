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
import { postServices } from "@/services";
import Loading from "@/components/Loading";

const Home = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const posts = useSelector(selectPosts);
  const loading = useSelector(selectFeedLoading);
  const hasMore = useSelector(selectHasMore);
  const currentPage = useSelector(selectPage);

  const [currentFeedType, setCurrentFeedType] = useState("for_you");

  // Restore liked posts từ localStorage khi component mount
  useEffect(() => {
    dispatch(restoreLikedPostsFromStorage());
  }, [dispatch]);

  // Fetch lần đầu Page 1 posts từ API
  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));

      try {
        const response = await postServices.getFeed(currentFeedType, 1);

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

  //Load post khi scroll đến cuối trang
  const fetchMorePosts = async () => {
    if (loading || !hasMore) return;

    dispatch(setLoading(true));

    try {
      const nextPage = currentPage + 1;
      const response = await postServices.getFeed(currentFeedType, nextPage);

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

  return (
    <div
      id="Home"
      className="w-full! md:w-[calc(100%-80px)]! flex justify-center px-6! md:px-0!"
    >
      <div className="w-full! md:min-w-[380px] md:max-w-[700px]! h-[calc(100%-60px)]">
        <FeedHeader
          currentFeedType={currentFeedType}
          onFeedTypeChange={setCurrentFeedType}
        />

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
  );
};
export default Home;
