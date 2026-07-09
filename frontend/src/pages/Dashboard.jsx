const Dashboard = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Welcome back! Here's what's happening with your network security today.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Placeholder Statistic Cards for Feature 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Access Logs</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">--</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Allowed Requests</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">--</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Denied Requests</h3>
          <p className="text-3xl font-bold text-red-500 mt-2">--</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active Policies</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">--</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 min-h-[400px] flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Charts and Analytics will be added here in Feature 4.</p>
      </div>
    </div>
  );
};

export default Dashboard;
