import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { isPostLiked, selectLikesCount } from "./selectors";
import {
  rollbackLike,
  syncLikeFromAPI,
  toggleLikeOptimistic,
} from "./postSlice";
import { postService } from "@/services";

export const useToggleLike = (postId) => {
  const dispatch = useDispatch();
  //Lấy trạng thái hiện tại
  const isLiked = useSelector(isPostLiked(postId));
  const likesCount = useSelector(selectLikesCount(postId));

  const handleToggleLike = async () => {
    //Lưu trạng thái cũ để rollback
    const oldState = {
      wasLiked: isLiked,
      oldCount: likesCount,
    };

    try {
      //Update UI luôn ko cần qua API
      dispatch(toggleLikeOptimistic(postId));
      const response = await postService.likePost(postId);

      //Nếu API thành công sẽ đồng bộ
      if (response.success && response.data) {
        // Đảm bảo sync với API response để có giá trị chính xác từ server
        dispatch(
          syncLikeFromAPI({
            postId,
            isLiked:
              response.data.is_liked !== undefined
                ? response.data.is_liked
                : !oldState.wasLiked, // Fallback: toggle state nếu API không có is_liked
            likesCount:
              response.data.likes_count !== undefined
                ? response.data.likes_count
                : oldState.oldCount + (oldState.wasLiked ? -1 : 1), // Fallback: tính từ oldCount
          }),
        );
      }
    } catch (error) {
      // rollback nếu fail
      dispatch(
        rollbackLike({
          postId,
          ...oldState,
        }),
      );

      const errorMessage =
        error.response?.data?.message ||
        "Không thể like bài viết. Vui lòng thử lại";
      toast.error(errorMessage);
    }
  };

  return {
    isLiked,
    likesCount,
    handleToggleLike,
  };
};
