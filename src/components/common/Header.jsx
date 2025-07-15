import SearchBar from "./SearchBar"
import { useLocation } from "react-router-dom"
import { FaWarehouse, FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Header() {
  const location = useLocation();
  const showSearch =
    location.pathname.startsWith("/products") ||
    location.pathname.startsWith("/categories");

  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <header className="fixed top-0 left-64 w-[calc(100%-16rem)] h-16 bg-gradient-to-r from-blue-700 to-teal-500 dark:from-blue-900 dark:to-teal-800 shadow z-50 dark:shadow-lg flex items-center">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-2">
          <FaWarehouse className="text-white text-2xl" />
          <h1 className="text-2xl text-white font-bold mb-0">Inventory Management</h1>
        </div>
        <div className="flex items-center gap-4">
          {showSearch && (
            <div className="w-full md:w-auto flex justify-center">
              <SearchBar />
            </div>
          )}
          <button
            onClick={() => setDark((prev) => !prev)}
            className="ml-4 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white dark:text-yellow-400"
            aria-label="Toggle dark mode"
          >
            {dark ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
          </button>
        </div>
      </div>
    </header>
  )
}
