import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="ml-64 pt-16 bg-gray-50 dark:bg-gray-800 dark:text-white min-h-screen">
        <Header />
        <Sidebar />
      <main className="flex-1 px-4">
          <Outlet />
      </main>
    </div>
       
  );
}
