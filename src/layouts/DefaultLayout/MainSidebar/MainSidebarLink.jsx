import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { selectIsAuthenticated, toggleSignUpModal } from "@/features/auth";
import Button from "@/components/Button";

function MainSidebarLink({ navigate }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleShowSignUpModal = () => {
    dispatch(toggleSignUpModal());
  };
  const privateRoute = navigate.url !== "/" && navigate.url !== "/search";

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        {privateRoute ? (
          isAuthenticated ? (
            <NavLink
              to={navigate.url}
              className="flex justify-center items-center p-1.5 w-15 h-15 [&>svg]:size-6"
            >
              {({ isActive }) => (
                <navigate.icon
                  className={`${
                    isActive ? "text-(--normaltext)" : "text-(--systemtext)"
                  }`}
                />
              )}
            </NavLink>
          ) : (
            <Button
              className="flex justify-center items-center p-1.5 w-15 h-15 [&>svg]:size-6"
              onClick={handleShowSignUpModal}
            >
              <navigate.icon className={"text-(--systemtext)"} />
            </Button>
          )
        ) : (
          <NavLink
            to={navigate.url}
            className="flex justify-center items-center p-1.5 w-15 h-15 [&>svg]:size-6"
          >
            {({ isActive }) => (
              <navigate.icon
                className={`${
                  isActive ? "text-(--normaltext)" : "text-(--systemtext)"
                }`}
              />
            )}
          </NavLink>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default MainSidebarLink;
