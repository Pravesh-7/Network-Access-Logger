import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser, FiBell } from 'react-icons/fi';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 shadow-sm z-10">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 md:hidden">NetAccess</h2>
      </div>
      <div className="flex items-center space-x-6">
        <button className="text-gray-500 hover:text-primary transition-colors relative">
          <FiBell className="text-xl" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            <FiUser />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:block">Admin User</span>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        >
          <FiLogOut className="mr-2" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
