import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import Button from "@/components/Button";

function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="fixed top-[50%] left-[50%] flex flex-col -translate-x-[50%] -translate-y-[50%] items-center justify-center text-center gap-5">
      <h2 className="text-3xl! text-center font-bold! w-[400px]">
        {t("not_found_page")}
      </h2>

      <p className="text-sm text-foreground max-w-[360px]">
        {t("not_found_page_des")}
      </p>

      <Button
        className="px-6 rounded-lg bg-foreground text-background hover:text-background! hover:bg-(--systemtext)!"
        onClick={() => navigate("/")}
      >
        {t("back_to_main")}
      </Button>
    </div>
  );
}

export default NotFound;
