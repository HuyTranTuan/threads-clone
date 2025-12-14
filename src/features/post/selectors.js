export const selectSelectedPost = (state) => state.post.selectedPost;
export const selectLikedPosts = (state) => state.post.likedPosts;
export const selectPostLoading = (state) => state.post.loading;
export const selectPostError = (state) => state.post.error;

export const selectLikesCount = (postId) => (state) => {
  return state.post.likesCount[postId] || 0;
};

export const isPostLiked = (postId) => (state) => {
  return state.post.likedPosts.includes(postId);
};
