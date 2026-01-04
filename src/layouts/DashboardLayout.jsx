import { Outlet } from "react-router-dom";
import DashboardNavbar from "../pages/DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <DashboardSidebar/>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <DashboardNavbar />
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
