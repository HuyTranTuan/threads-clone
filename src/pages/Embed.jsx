import { useEffect } from "react";
import { useParams, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import PostCard from "@/components/post/PostCard";
import PostCardSkeleton from "@/components/post/components/PostCardSkeleton";
import {
  getPost,
  clearPostDetail,
} from "@/features/postDetail/postDetailSlice";

const Embed = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { post, loading, error } = useSelector((state) => state.postDetail);

  useEffect(() => {
    if (postId) {
      dispatch(getPost(postId));
    }

    return () => {
      dispatch(clearPostDetail());
    };
  }, [dispatch, postId]);

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-muted-foreground">
        {t("not_found_post")}
      </div>
    );
  }

  return (
    <div className="embed-container">
      {/* Post Card */}
      {loading ? (
        <PostCardSkeleton />
      ) : post ? (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <PostCard post={post} isDetailView />
        </div>
      ) : null}
    </div>
  );
};

export default Embed;
