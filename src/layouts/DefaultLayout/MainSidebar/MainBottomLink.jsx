import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/Button";
import { selectIsAuthenticated, toggleSignUpModal } from "@/features/auth";

function MainBottomLink({ navigate }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleShowSignUpModal = () => {
    dispatch(toggleSignUpModal());
  };
  const privateRoute = navigate.url !== "/" && navigate.url !== "/search";

  return (
    <>
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
    </>
  );
}

export default MainBottomLink;
