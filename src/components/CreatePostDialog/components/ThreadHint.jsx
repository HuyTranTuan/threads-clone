import { useTranslation } from "react-i18next";
import AvatarRounded from "@/components/post/components/AvatarRounded";

function ThreadHint({ currentUser }) {
  const { t } = useTranslation();

  return (
    <div className="flex gap-3 mt-3 items-center">
      <AvatarRounded currentUser={currentUser} />

      <span className="text-muted-foreground text-[15px]">
        {t("add_to_threads")}
      </span>
    </div>
  );
}

export default ThreadHint;
