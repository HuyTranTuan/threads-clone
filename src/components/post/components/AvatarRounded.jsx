import { useTranslation } from "react-i18next";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function AvatarRounded({ post, currentUser = null }) {
  const { t } = useTranslation();
  return (
    <>
      {currentUser ? (
        <div className="flex flex-col items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={currentUser?.avatar_url || "https://github.com/shadcn.png"}
              alt={currentUser?.username || "User"}
            />
            <AvatarFallback className="bg-gray-200 text-muted-foreground font-semibold">
              {currentUser?.username?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <div className="shrink-0">
          <Avatar>
            <AvatarImage
              src={post?.user?.avatar_url}
              alt={t("avatar")}
              className="cursor-pointer"
            />
            <AvatarFallback className="bg-gray-200 text-muted-foreground font-semibold">
              {post?.user?.username?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </>
  );
}

export default AvatarRounded;
