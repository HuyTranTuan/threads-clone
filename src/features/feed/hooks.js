import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFeed } from "@/services";
import { selectPosts } from "@/features/feed";

export const useFetchGetFeed = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);
};

export const useGetFeed = () => {
  const feed = useSelector(selectPosts);
  return feed;
};
