import { lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";

// Pages
import Home from "@/pages/Home";
import Embed from "@/pages/Embed";
import NotFound from "@/pages/NotFound";

const Profile = lazy(() => import("@/pages/Profile"));
const Search = lazy(() => import("@/pages/Search"));
const Register = lazy(() => import("@/pages/Auth/Register"));
const Login = lazy(() => import("@/pages/Auth/Login"));
const ResetPassword = lazy(() => import("@/pages/Auth/ResetPassword"));
const VerifyEmail = lazy(() => import("@/pages/Auth/VerifyEmail"));
const ForgotPassword = lazy(() => import("@/pages/Auth/ForgotPassword"));
const Insights = lazy(() => import("@/pages/Insights"));
const ForYou = lazy(() => import("@/pages/ForYou"));
const Account = lazy(() => import("@/pages/Account"));
const Settings = lazy(() => import("@/pages/Settings"));
const Saved = lazy(() => import("@/pages/Saved"));
const Liked = lazy(() => import("@/pages/Liked"));
const GhostPost = lazy(() => import("@/pages/GhostPost"));
const Acitvities = lazy(() => import("@/pages/Acitvities"));

import http from "@/utils/http";
// Components
import AuthProvider from "@/components/AuthProvider";
import PrivateRoute from "@/components/PrivateRoute";

// Layouts
import DefaultLayout from "@/layouts/DefaultLayout";
import AuthLayout from "@/layouts/AuthLayout";
import EmbedLayout from "@/layouts/EmbedLayout";
import PostDetail from "@/pages/PostDetail";

function AppRoutes() {
  useEffect(() => {
    http.get("/auth/user");
  }, []);

  return (
    <BrowserRouter basename="/threads-clone">
      <AuthProvider />
      <Toaster />
      <Routes>
        {/* Default Layout */}
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="post/:id" element={<PostDetail />} />
          <Route element={<PrivateRoute />}>
            <Route path="activities" element={<Acitvities />} />
            <Route path="account" element={<Account />} />
            <Route path="profile" element={<Profile />} />
            <Route path="insights" element={<Insights />} />
            <Route path="for-you" element={<ForYou />} />
            <Route path="following" element={<ForYou />} />
            <Route path="ghost-posts" element={<GhostPost />} />
            <Route path="settings" element={<Settings />} />
            <Route path="saved" element={<Saved />} />
            <Route path="liked" element={<Liked />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/verify-email" element={<AuthLayout />}>
          <Route index element={<VerifyEmail />} />
        </Route>

        {/* Auth Layout */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Embed Route - for iframe embedding */}
        <Route path="/:username/post/:postId/embed" element={<EmbedLayout />}>
          <Route index element={<Embed />} />
        </Route>

        {/*NotFound*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
