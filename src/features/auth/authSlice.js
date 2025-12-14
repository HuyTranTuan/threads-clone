import { createSlice } from "@reduxjs/toolkit";

import { getCurrentUser } from "@/services";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  showSignUpModal: false,

  //State Register
  registerLoading: false,
  registerError: null,
  registerSuccess: false,

  //State Login
  loginLoading: false,
  loginError: null,
  loginSuccess: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //Action set loading
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    //Register actions
    registerStart: (state) => {
      state.registerLoading = true;
      state.registerError = null;
      state.registerSuccess = false;
    },
    registerSuccess: (state, action) => {
      state.registerLoading = false;
      state.registerSuccess = true;
      state.user = action.payload.user || null;
      state.registerError = null;
    },
    registerFailure: (state, action) => {
      state.registerLoading = false;
      state.registerError = action.payload;
      state.registerSuccess = false;
    },
    // Reset Register state
    resetRegisterState: (state) => {
      state.registerLoading = false;
      state.registerError = null;
      state.registerSuccess = false;
    },

    //Login actions
    loginStart: (state) => {
      state.loginLoading = true;
      state.loginError = null;
      state.loginSuccess = false;
    },
    loginSuccess: (state, action) => {
      state.loginLoading = false;
      state.loginSuccess = true;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload;
      state.loginSuccess = false;
    },
    resetLoginState: (state) => {
      state.loginLoading = false;
      state.loginError = null;
      state.loginSuccess = false;
    },

    //Logout action
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    //Restore user từ localStorage khi app khởi động
    restoreUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },

    //Action đóng/mở Modal
    toggleSignUpModal: (state, action) => {
      state.showSignUpModal = action.payload ?? !state.showSignUpModal;
    },
    //Action đóng modal
    closeSignUpModal: (state) => {
      state.showSignUpModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const {
  setLoading,
  registerStart,
  registerSuccess,
  registerFailure,
  resetRegisterState,
  loginStart,
  loginSuccess,
  loginFailure,
  resetLoginState,
  logout,
  setUser,
  restoreUser,
  toggleSignUpModal,
  closeSignUpModal,
} = authSlice.actions;

export default authSlice.reducer;
