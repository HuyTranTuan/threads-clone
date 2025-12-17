import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router";

import { Button } from "@/components/ui/button";
import AuthCard from "@/features/auth/components/AuthCard";

function MainContain({ shouldShowAuthCard }) {
  const { t } = useTranslation();
  return (
    <div
      className="ml-0 w-full h-[calc(100%-70px)] md:h-full! flex justify-center! gap-7! relative"
      id="MainContent"
    >
      <Outlet />
      <AuthCard showAuthCard={shouldShowAuthCard} />
      <Button className="px-3.5 py-1.5 absolute top-3 right-3 block lg:hidden">
        <Link to="auth/login" className="text-base! flex justify-center">
          {t("pure_login")}
        </Link>
      </Button>
    </div>
  );
}

export default MainContain;
