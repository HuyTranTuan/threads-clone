import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { searchServices } from "@/services";

export const searchAll = createAsyncThunk(
  "search/searchAll",
  async ({ query, page = 1, perPageTopics = 10, perPageUsers = 10 }) => {
    const response = await searchServices.search(
      query,
      page,
      perPageTopics,
      perPageUsers,
    );
    return response;
  },
);

export const searchTopics = createAsyncThunk(
  "search/searchTopics",
  async ({ query }) => {
    const response = await searchServices.searchTopics(query);
    return response;
  },
);

export const getUserSuggestions = createAsyncThunk(
  "search/getUserSuggestions",
  async ({ page = 1, perPage = 10 }) => {
    const response = await searchServices.getUserSuggestions(page, perPage);
    return response;
  },
);

export const followUser = createAsyncThunk(
  "search/followUser",
  async (userId) => {
    await searchServices.followUser(userId);
    return userId;
  },
);

export const unfollowUser = createAsyncThunk(
  "search/unfollowUser",
  async (userId) => {
    await searchServices.unfollowUser(userId);
    return userId;
  },
);

const initialState = {
  query: "",
  searchMode: "all",
  topics: [],
  users: [],
  loading: false,
  error: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    setSearchMode: (state, action) => {
      state.searchMode = action.payload;
    },
    clearSearch: (state) => {
      state.query = "";
      state.topics = [];
      state.users = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search All
      .addCase(searchAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAll.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload.topics || [];
        state.users = action.payload.users || [];
      })
      .addCase(searchAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Search Topics
      .addCase(searchTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload || [];
      })
      .addCase(searchTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // User Suggestions
      .addCase(getUserSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload || [];
      })
      .addCase(getUserSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Follow User
      .addCase(followUser.fulfilled, (state, action) => {
        const userId = action.payload;
        state.users = state.users.map((user) =>
          user.id === userId
            ? {
                ...user,
                is_following: true,
                followers_count: user.followers_count + 1,
              }
            : user,
        );
      })
      // Unfollow User
      .addCase(unfollowUser.fulfilled, (state, action) => {
        const userId = action.payload;
        state.users = state.users.map((user) =>
          user.id === userId
            ? {
                ...user,
                is_following: false,
                followers_count: Math.max(0, user.followers_count - 1),
              }
            : user,
        );
      });
  },
});

export const { setSearchQuery, setSearchMode, clearSearch } =
  searchSlice.actions;
export default searchSlice;
