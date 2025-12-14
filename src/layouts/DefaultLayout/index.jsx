import { SidebarProvider } from "@/components/ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { closeSignUpModal, toggleSignUpModal } from "@/features/auth";
import { useEffect, useState } from "react";

import MainSidebar from "./MainSidebar";
import MainContain from "./MainContain";
import SignUpModal from "@/features/auth/components/SignUpModal";
import {
  selectIsAuthenticated,
  selectIsInitializing,
  selectShowSignUpModal,
} from "@/features/auth/selectors";
import { HouseIcon } from "@/components/ui/icons/lucide-house";
import { SearchIcon } from "@/components/ui/icons/lucide-search";
import { HeartIcon } from "@/components/ui/icons/lucide-heart";
import { UserIcon } from "@/components/ui/icons/lucide-user";
import { PlusIcon } from "@/components/ui/icons/lucide-plus";
import Button from "@/components/Button";
import MainBottomLink from "./MainSidebar/MainBottomLink";
import CreatePostDialog from "@/components/CreatePostDialog";

function DefaultLayout() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isInitializing = useSelector(selectIsInitializing);
  const showModal = useSelector(selectShowSignUpModal);
  const [isOpenCreatePostDialog, setIsOpenCreatePostDialog] = useState(false);

  const home = {
    title: "Home",
    url: "/",
    icon: HouseIcon,
  };
  const search = {
    title: "Search",
    url: "/search",
    icon: SearchIcon,
  };
  const activites = {
    title: "Activities",
    url: "/activities",
    icon: HeartIcon,
  };

  const account = {
    title: "Account",
    url: "/account",
    icon: UserIcon,
  };

  const shouldShowAuthCard = !isAuthenticated && !isInitializing;

  useEffect(() => {
    (async () => {
      if (isAuthenticated) return;

      const access_token = localStorage.getItem("access_token");

      if (access_token) {
        try {
          const response = await authService.getCurrentUser();

          if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
            dispatch(restoreUser(response.data));
          }
        } catch (error) {
          if (error.response?.status === 401) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user");
            dispatch(logout());
          } else {
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
              try {
                const userData = JSON.parse(savedUser);
                dispatch(restoreUser(userData));
              } catch (parseError) {}
            }
          }
        }
      }
    })();
  }, []);

  const handleClickTogglgSignupModal = () => {
    if (!isAuthenticated) {
      dispatch(toggleSignUpModal());
    } else {
      setIsOpenCreatePostDialog(true);
    }
  };

  return (
    <div className="relative w-full! bg-background!" id="DefaultLayout">
      <SidebarProvider>
        <MainSidebar
          isAuthenticated={isAuthenticated}
          home={home}
          activites={activites}
          account={account}
          search={search}
        />
        <MainContain shouldShowAuthCard={shouldShowAuthCard} />
        <div className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden h-16 w-full items-center justify-around border-t bg-background px-4">
          <MainBottomLink navigate={home} />
          <MainBottomLink navigate={search} />
          <Button
            className="flex justify-center items-center p-1.5 w-15 h-15 [&>svg]:size-6 rounded-xl bg-sidebar-accent group"
            onClick={handleClickTogglgSignupModal}
          >
            <PlusIcon
              className={
                "text-(--systemtext) group-hover:text-sidebar-accent-foreground"
              }
            />
          </Button>
          <MainBottomLink navigate={activites} />
          <MainBottomLink navigate={account} />
        </div>

        <SignUpModal
          open={showModal}
          onOpenChange={(open) => {
            if (!open) dispatch(closeSignUpModal());
          }}
          id="SignUpModal"
        />
        <CreatePostDialog
          open={isOpenCreatePostDialog}
          onOpenChange={setIsOpenCreatePostDialog}
        />
      </SidebarProvider>
    </div>
  );
}

export default DefaultLayout;
