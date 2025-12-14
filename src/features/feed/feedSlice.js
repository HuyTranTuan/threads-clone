import { getFeed } from "@/services";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  pagination: {
    current_page: 1,
    total: 0,
    last_page: 1,
    per_page: 15,
  },
  loading: false,
  error: null,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    //Set danh sách post
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.page = 1; // Reset page về 1
    },
    resetFeed: (state) => {
      state.posts = [];
      state.pagination = initialState.pagination;
    },

    //Tạo infinite scroll
    appendPosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    //Update khi có thay đổi (like, cmt)
    updatePost: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id,
      );
      state.posts[index] = action.payload;
    },
    updatePostQuotes: (state, action) => {
      const { original_post_id } = action.payload;
      state.posts = state.posts.map((post) => {
        if (post.id === original_post_id) {
          return {
            ...post,
            reposts_and_quotes_count: post.reposts_and_quotes_count + 1,
          };
        }

        if (post.original_post?.id === original_post_id) {
          return {
            ...post,
            original_post: {
              ...post.original_post,
              reposts_and_quotes_count:
                post.original_post.reposts_and_quotes_count + 1,
            },
          };
        }
        return post;
      });
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    //Đếm số page
    incrementPage: (state) => {
      state.page += 1;
    },

    addPostToFeed: (state, action) => {
      state.posts.unshift(action.payload);
    },
    removePostFromFeed: (state, action) => {
      const postId = action.payload;
      state.posts = state.posts.filter((post) => post.id !== postId);
    },
    removePostsByUserId: (state, action) => {
      const userId = action.payload;
      state.posts = state.posts.filter((post) => post.user?.id !== userId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.loading = false;
        const { data, pagination } = action.payload;

        state.pagination = pagination;

        if (pagination.current_page === 1) {
          state.posts = data;
        } else {
          const newPosts = data.filter(
            (newPost) =>
              !state.posts.some(
                (existingPost) => existingPost.id === newPost.id,
              ),
          );
          state.posts = [...state.posts, ...newPosts];
        }
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setPosts,
  resetFeed,

  appendPosts,
  setLoading,
  setError,

  updatePost,
  updatePostQuotes,
  setHasMore,
  incrementPage,

  addPostToFeed,
  removePostFromFeed,
  removePostsByUserId,
} = feedSlice.actions;

export const { reducerPath } = feedSlice.reducerPath;

export default feedSlice.reducer;
