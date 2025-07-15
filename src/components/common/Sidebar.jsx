import { FaTachometerAlt, FaBoxOpen, FaTags, FaExchangeAlt, FaBell } from 'react-icons/fa';
import SidebarItem from './SidebarItem';

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-700 to-teal-500 dark:from-blue-900 dark:to-teal-800 shadow-lg z-40 flex flex-col">
      <nav className="flex-1 px-4 py-8 mt-16">
        <ul className="space-y-2">
          <SidebarItem to="/dashboard" icon={FaTachometerAlt} label="Dashboard" />
          <SidebarItem to="/products" icon={FaBoxOpen} label="Products" />
          <SidebarItem to="/categories" icon={FaTags} label="Categories" />
          <SidebarItem to="/transactions" icon={FaExchangeAlt} label="Transactions" />
          <SidebarItem to="/notifications" icon={FaBell} label="Notifications" />
        </ul>
      </nav>
    </aside>
  );
}
