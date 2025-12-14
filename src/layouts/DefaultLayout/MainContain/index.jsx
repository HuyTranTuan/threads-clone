import AuthCard from "@/features/auth/components/AuthCard";
import { Outlet } from "react-router";

function MainContain({ shouldShowAuthCard }) {
  return (
    <div
      className="ml-0 md:ml-[30px]! w-full! md:w-[calc(100%-20px)]! h-[calc(100%-70px)]! md:h-full! flex justify-around! gap-6! md:pr-8! md:mt-3!"
      id="MainContent"
    >
      <Outlet />
      <AuthCard showAuthCard={shouldShowAuthCard} />
    </div>
  );
}

export default MainContain;
