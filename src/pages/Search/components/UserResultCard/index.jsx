import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { selectIsAuthenticated } from "@/features/auth";
import { followUser, unfollowUser } from "@/features/search/searchSlice";
import SignUpModal from "@/features/auth/components/SignUpModal";
import AvatarRounded from "@/components/post/components/AvatarRounded";

function UserResultCard({ user }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isLoading, setIsLoading] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const handleFollowClick = async () => {
    if (!isAuthenticated) {
      setLoginDialogOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      if (user.is_following) {
        await dispatch(unfollowUser(user.id)).unwrap();
      } else {
        await dispatch(followUser(user.id)).unwrap();
      }
    } catch (error) {
      console.error("Follow action failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-start gap-3! p-4! hover:bg-secondary/30 transition-colors cursor-pointer">
        {/* Avatar */}
        <AvatarRounded currentUser={user} />

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1!">
            <span className="font-semibold! text-sm truncate">
              {user.username}
            </span>
            {user.verified && (
              <BadgeCheck className="h-4 w-4 text-blue-500 shrink-0" />
            )}
          </div>
          {user.name && (
            <p className="text-sm text-muted-foreground truncate">
              {user.name}
            </p>
          )}
          {user.bio && (
            <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
              {user.bio}
            </p>
          )}
          <p className="text-sm text-muted-foreground mt-1!">
            {t("followers", { count: user.followers_count || 0 })}
          </p>
        </div>

        {/* Follow Button */}
        <Button
          variant={user.is_following ? "outline" : "default"}
          size="sm"
          onClick={handleFollowClick}
          disabled={isLoading}
          className="shrink-0 rounded-lg! px-5!"
        >
          {user.is_following ? t("following") : t("follow")}
        </Button>
      </div>

      <SignUpModal open={loginDialogOpen} onOpenChange={setLoginDialogOpen} />
    </>
  );
}

export default UserResultCard;
