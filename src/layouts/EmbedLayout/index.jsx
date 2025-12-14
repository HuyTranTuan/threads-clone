import { Outlet } from "react-router";

function EmbedLayout() {
  return (
    <div className="min-h-screen">
      <div className="w-full max-w-[640px] p-2">
        <Outlet />
      </div>
    </div>
  );
}

export default EmbedLayout;
