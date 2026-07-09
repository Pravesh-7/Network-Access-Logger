import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiShield, FiFileText, FiActivity, FiSettings } from 'react-icons/fi';
import { getUserFromToken } from '../utils/auth';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const user = getUserFromToken();
  const role = user?.role || 'Guest';

  const allLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome className="mr-3 text-lg" />, roles: ['Admin', 'Security Analyst'] },
    { name: 'Policies', path: '/dashboard/policies', icon: <FiShield className="mr-3 text-lg" />, roles: ['Admin', 'Security Analyst'] },
    { name: 'Access Logs', path: '/dashboard/logs', icon: <FiFileText className="mr-3 text-lg" />, roles: ['Admin', 'Security Analyst'] },
    { name: 'Simulator', path: '/dashboard/simulator', icon: <FiActivity className="mr-3 text-lg" />, roles: ['Admin', 'Security Analyst', 'Employee'] },
    { name: 'Settings', path: '/dashboard/settings', icon: <FiSettings className="mr-3 text-lg" />, roles: ['Admin'] },
  ];

  const links = allLinks.filter(link => link.roles.includes(role));

  return (
    <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col h-screen shadow-xl hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white tracking-wide flex items-center">
          <FiShield className="text-primary mr-2" />
          NetAccess
        </h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              currentPath === link.path
                ? 'bg-primary text-white shadow-md'
                : 'hover:bg-gray-800 hover:text-white'
            }`}
          >
            {link.icon}
            <span className="font-medium">{link.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-500 text-center">© 2026 NetAccess Inc.</div>
      </div>
    </aside>
  );
};

export default Sidebar;
