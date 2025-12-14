import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SunIcon } from "@/components/ui/icons/lucide-sun";
import { MoonIcon } from "@/components/ui/icons/lucide-moon";
import { logout, selectIsAuthenticated } from "@/features/auth";
import { Link, useNavigate } from "react-router";

function NavbarMenu({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <DropdownMenu id="NavbarMenu">
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="h-fit! min-w-40" align="start">
        <DropdownMenuGroup className="p-2!">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex! justify-between px-4! py-4.5!">
              {t("appearance")}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="px-3! py-4! min-w-[140px]!">
              <DropdownMenuLabel className="text-center mb-2.5!">
                {t("appearance")}
              </DropdownMenuLabel>
              <DropdownMenuGroup className="flex h-8 items-center">
                <DropdownMenuItem
                  className={`flex-1 h-full justify-center [&>svg]:size-5`}
                >
                  <SunIcon className="w-full h-full" />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`flex-1 h-full justify-center [&>svg]:size-5`}
                >
                  <MoonIcon className="w-full h-full" />
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {isAuthenticated && (
            <>
              <DropdownMenuItem className="flex! justify-between px-4! py-4.5!">
                <Link to="/insights">{t("insights")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex! justify-between px-4! py-4.5!">
                <Link to="/settings">{t("settings")}</Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className=" border-2 border-systemtext" />

        {isAuthenticated && (
          <DropdownMenuGroup className="p-2!">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex! justify-between px-4! py-4.5!">
                <Link to="/">{t("feeds")}</Link>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="p-2!">
                  <DropdownMenuItem className="flex! justify-between px-4! py-4.5!">
                    <Link to="/for-you">{t("for_you")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex! justify-between px-4! py-4.5!">
                    <Link to="/following">{t("following")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex! justify-between px-4! py-4.5!">
                    <Link to="/ghost-posts">{t("ghost_posts")}</Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem className="flex! justify-between px-4! py-4.5!">
              <Link to="/saved">{t("saved")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex! justify-between px-4! py-4.5!">
              <Link to="/liked">{t("liked")}</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuGroup className="p-2!">
          <DropdownMenuItem className="flex! justify-between px-4! py-4.5!">
            {t("report_a_problem")}
          </DropdownMenuItem>
          {isAuthenticated && <DropdownMenuSeparator />}
          {isAuthenticated && (
            <DropdownMenuItem
              className="flex justify-between! px-4! py-4.5! text-red-500"
              onClick={handleLogout}
            >
              {t("logout")}
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

NavbarMenu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavbarMenu;
