import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { MenuIcon } from "@/components/ui/icons/lucide-menu";
import { PlusIcon } from "@/components/ui/icons/lucide-plus";
import Logo from "@/components/Logo";
import NavbarMenu from "@/components/NavbarMenu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { LanguagesIcon } from "@/components/ui/icons/lucide-languages";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MainSidebarLink from "@/layouts/DefaultLayout/MainSidebar/MainSidebarLink";
import { Button } from "@/components/ui/button";
import { selectIsAuthenticated, toggleSignUpModal } from "@/features/auth";
import CreatePostDialog from "@/components/CreatePostDialog";
import { selectSavedLanguage, setLanguage } from "@/features/language";
import { cn } from "@/lib/utils";

function MainSidebar({ home, search, activites, account }) {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [screenWidth, setCreenWidth] = useState(window.screen.width);
  const [isOpenCreatePostDialog, setIsOpenCreatePostDialog] = useState(false);
  const currentLanguage = useSelector(selectSavedLanguage);

  const handleClickTogglgSignupModal = () => {
    if (!isAuthenticated) {
      dispatch(toggleSignUpModal());
    } else {
      setIsOpenCreatePostDialog(true);
    }
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    dispatch(setLanguage(lang));
    localStorage.setItem("threads_language", lang);
  };

  useEffect(() => {
    setCreenWidth(window.screen.width);
  }, [screenWidth]);

  return (
    <Sidebar
      className="bg-threadbg! backdrop-blur-sm flex"
      side={`${screenWidth > 700 ? "left" : "bottom"}`}
    >
      <SidebarContent className="justify-between! p-2.5!">
        <SidebarGroup className="w-full aspect-3/4! flex justify-center items-center">
          <SidebarGroupLabel className="w-full h-full">
            <Logo path={"/"} />
          </SidebarGroupLabel>
        </SidebarGroup>
        <SidebarGroup className="">
          <SidebarGroupContent>
            <SidebarMenu className="">
              <MainSidebarLink navigate={home} />
              <MainSidebarLink navigate={search} />
              <Button
                className="flex justify-center items-center p-1.5 w-15 h-15 [&>svg]:size-6! rounded-xl bg-sidebar-accent"
                onClick={handleClickTogglgSignupModal}
              >
                <PlusIcon className={"text-foreground "} />
              </Button>
              <MainSidebarLink navigate={activites} />
              <MainSidebarLink navigate={account} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="justify-center items-center gap-2.5">
          {/* Translate Button */}
          <SidebarGroupLabel className="[&>svg]:size-6">
            <DropdownMenu className="relative">
              <DropdownMenuTrigger asChild>
                <LanguagesIcon className="stroke-2 text-normaltext size-6 hover:cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="absolute flex bottom-full left-[30px] p-2.5!">
                <DropdownMenuItem
                  className={cn(
                    "px-3! py-2.5! cursor-pointer! grow flex justify-center  hover:bg-accent-foreground! hover:text-background!",
                    currentLanguage === "vn"
                      ? "bg-foreground! text-background!"
                      : "bg-background! text-foreground!",
                  )}
                  onClick={() => handleLanguageChange("vn")}
                >
                  VN
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={cn(
                    "px-3! py-2.5! cursor-pointer! grow flex justify-center  hover:bg-accent-foreground! hover:text-background!",
                    currentLanguage === "en"
                      ? "bg-foreground! text-background!"
                      : "bg-background! text-foreground!",
                  )}
                  onClick={() => handleLanguageChange("en")}
                >
                  EN
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarGroupLabel>

          <SidebarGroupLabel className="[&>svg]:size-6">
            <NavbarMenu>
              <MenuIcon className="stroke-2! text-normaltext hover:cursor-pointer" />
            </NavbarMenu>
          </SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>

      <CreatePostDialog
        open={isOpenCreatePostDialog}
        onOpenChange={setIsOpenCreatePostDialog}
      />
    </Sidebar>
  );
}

MainSidebar.propTypes = {
  children: PropTypes.node.isRequired,
  classNames: PropTypes.string,
};

export default MainSidebar;
