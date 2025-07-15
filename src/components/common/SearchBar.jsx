import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [value, setValue] = useState(params.get("search") || "");

  const handleSearch = (e) => {
    e.preventDefault();
    if (value.trim()) {
      navigate(`${location.pathname}?search=${encodeURIComponent(value)}`);
    } else {
      navigate(location.pathname);
    }
  };

  return (
    <form className="flex" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={e => setValue(e.target.value)}
        className="w-full p-2 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-r-md hover:bg-blue-700 dark:hover:bg-blue-800">
        Apply
      </button>
    </form>
  );
}
