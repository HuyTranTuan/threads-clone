import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "@/utils/http";

// Async thunks
export const getPost = createAsyncThunk("postDetail/getPost", async (id) => {
  return await http.get(`/posts/${id}`);
});

export const getPostReplies = createAsyncThunk(
  "postDetail/getReplies",
  async ({ id, page = 1, per_page = 15, sort = "newest" }) => {
    return await http.get(`/posts/${id}/replies`, {
      params: { page, per_page, sort },
    });
  },
);

const initialState = {
  post: null,
  replies: [],
  repliesPagination: {
    current_page: 1,
    total: 0,
    last_page: 1,
    per_page: 15,
  },
  loading: false,
  repliesLoading: false,
  error: null,
};

export const postDetailSlice = createSlice({
  name: "postDetail",
  initialState,
  reducers: {
    clearPostDetail: (state) => {
      state.post = null;
      state.replies = [];
      state.repliesPagination = initialState.repliesPagination;
      state.loading = false;
      state.repliesLoading = false;
      state.error = null;
    },
    addReply: (state, action) => {
      state.replies.unshift(action.payload);
      if (state.post) {
        state.post.replies_count = (state.post.replies_count || 0) + 1;
      }
    },
    updateReplyLike: (state, action) => {
      const { postId, is_liked_by_auth, likes_count } = action.payload;
      state.replies = state.replies.map((reply) => {
        if (reply.id === postId) {
          return { ...reply, is_liked_by_auth, likes_count };
        }
        return reply;
      });
    },
    updatePostDetailLike: (state, action) => {
      const { postId, is_liked_by_auth, likes_count } = action.payload;
      if (state.post && state.post.id === postId) {
        state.post.is_liked_by_auth = is_liked_by_auth;
        state.post.likes_count = likes_count;
      }
    },
    updatePostDetailRepost: (state, action) => {
      const { postId, reposts_and_quotes_count, is_reposted_by_auth } =
        action.payload;
      if (state.post && state.post.id === postId) {
        state.post.reposts_and_quotes_count = reposts_and_quotes_count;
        state.post.is_reposted_by_auth = is_reposted_by_auth;
      }
    },
    updateReplyRepost: (state, action) => {
      const { postId, reposts_and_quotes_count, is_reposted_by_auth } =
        action.payload;
      state.replies = state.replies.map((reply) => {
        if (reply.id === postId) {
          return { ...reply, reposts_and_quotes_count, is_reposted_by_auth };
        }
        return reply;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Post
      .addCase(getPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload.data;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Get Replies
      .addCase(getPostReplies.pending, (state) => {
        state.repliesLoading = true;
      })
      .addCase(getPostReplies.fulfilled, (state, action) => {
        state.repliesLoading = false;
        const { data, pagination } = action.payload;
        state.repliesPagination = pagination;

        if (pagination.current_page === 1) {
          state.replies = data;
        } else {
          // Append new replies for infinite scroll
          const newReplies = data.filter(
            (newReply) =>
              !state.replies.some((existing) => existing.id === newReply.id),
          );
          state.replies = [...state.replies, ...newReplies];
        }
      })
      .addCase(getPostReplies.rejected, (state, action) => {
        state.repliesLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  clearPostDetail,
  addReply,
  updateReplyLike,
  updatePostDetailLike,
  updatePostDetailRepost,
  updateReplyRepost,
} = postDetailSlice.actions;
export default postDetailSlice;
