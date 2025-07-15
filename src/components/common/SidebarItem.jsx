import { NavLink } from "react-router-dom";

export default function SidebarItem({ to, icon: Icon, label }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
          ${isActive ? 'bg-white dark:bg-gray-800 text-blue-700 dark:text-white font-semibold shadow' : 'text-white hover:bg-blue-500 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white'}`
        }
      >
        <Icon className="text-lg" />
        {label}
      </NavLink>
    </li>
  );
}