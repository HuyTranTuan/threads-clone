import { Link, Outlet } from "react-router";
import images from "@/assets/images";
import { useTranslation } from "react-i18next";

const AuthLayout = () => {
  const { t } = useTranslation();
  return (
    <div className="relative">
      <div className="absolute top-0 w-full">
        <img
          src={images.logo}
          alt="Threads decorative header"
          className="w-full h-auto object-fill object-center"
        />
      </div>
      <Outlet />

      {/* Footer */}
      <footer className="fixed bottom-1 w-full flex! flex-wrap justify-center! gap-3 sm:gap-4 text-xs sm:text-sm">
        <span className="text-systemtext">© 2025</span>
        <Link href="#" className="text-systemtext!">
          {t("terms")}
        </Link>
        <Link href="#" className="text-systemtext!">
          {t("privacy_policy")}
        </Link>
        <Link href="#" className="text-systemtext!">
          {t("cookie_policy")}
        </Link>
        <Link href="#" className="text-systemtext!">
          {t("report_a_problem")}
        </Link>
      </footer>
    </div>
  );
};
export default AuthLayout;
