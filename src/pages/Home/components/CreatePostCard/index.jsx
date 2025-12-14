import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { selectIsAuthenticated, selectUser } from "@/features/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CreatePostDialog from "@/components/CreatePostDialog";
import AvatarRounded from "@/components/post/components/AvatarRounded";
import SignUpModal from "@/features/auth/components/SignUpModal";

function CreatePostCard() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Card className="bg-background py-4 transition-colors shadow-none cursor-pointer border-b p-2.5! rounded-xl! border-2! border-border! mb-2.5!">
        <CardContent className="flex items-center p-2 gap-3">
          <AvatarRounded currentUser={currentUser} />

          <div
            className="flex-1 px-4 py-2 focus:ring-0 p-0 text-foreground placeholder:text-foreground-tertiary text-md transition-colors"
            onClick={handleOpenDialog}
          >
            {t("write_sth")}
          </div>

          <Button
            className="rounded-md p-3 text-background bg-foreground"
            onClick={handleOpenDialog}
          >
            {t("post")}
          </Button>
        </CardContent>
      </Card>

      {isAuthenticated ? (
        <CreatePostDialog open={isOpen} onOpenChange={setIsOpen} />
      ) : (
        <SignUpModal open={isOpen} onOpenChange={setIsOpen} />
      )}
    </>
  );
}

export default CreatePostCard;
