import { Link, Outlet } from "react-router";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import images from "@/assets/images";
import { ThreadsFillIcon } from "@/components/ui/icons/akar-icons-threads-fill";

const AuthLayout = () => {
  const { t } = useTranslation();
  const deviceHeight = window.screen.height;

  return (
    <div className="relative max-w-[1800px] h-dvh mx-auto!">
      <div className="absolute top-0 w-full flex justify-center items-center">
        <img
          src={images.logo}
          alt="Threads decorative header"
          className={cn(
            "w-full h-auto object-cover! object-center",
            deviceHeight >= 600 ? "hidden sm:block" : "hidden",
          )}
        />
        <Link
          className={cn(
            "h-full! p-3!",
            deviceHeight >= 600 ? "block sm:hidden" : "block",
          )}
          to="/"
        >
          <ThreadsFillIcon
            className={cn(
              "stroke-1 fill-(--normaltext)! w-11! h-12!",
              deviceHeight >= 600 ? "size-12 sm:size-14" : "size-8",
            )}
          />
        </Link>
      </div>
      <div className="w-full h-full px-4">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="fixed bottom-1 w-full! flex! flex-wrap justify-center! gap-3 sm:gap-4 text-xs sm:text-sm">
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
