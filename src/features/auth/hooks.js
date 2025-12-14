import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentUser } from "@/services";
import { selectUser } from "@/features/auth/selectors";

export const useFetchCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
};

export const useCurrentUser = () => {
  const currentUser = useSelector(selectUser);
  return currentUser;
};
