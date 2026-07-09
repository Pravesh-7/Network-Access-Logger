import { useState, useEffect } from 'react';
import { getDashboardData } from '../services/dashboardService';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#10B981', '#EF4444']; // Emerald (Allowed), Red (Denied)

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDashboardData();
        setData(result);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading dashboard...</div>;
  if (!data) return <div className="p-8 text-center text-red-500">Failed to load dashboard.</div>;

  const { stats, chartData, recentActivity } = data;
  
  const pieData = [
    { name: 'Allowed', value: stats.allowedRequests },
    { name: 'Denied', value: stats.deniedRequests }
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Overview of network security events.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Total Logs</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalLogs}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Allowed</h3>
          <p className="text-3xl font-bold text-green-500 mt-2">{stats.allowedRequests}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Denied</h3>
          <p className="text-3xl font-bold text-red-500 mt-2">{stats.deniedRequests}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Policies</h3>
          <p className="text-3xl font-bold text-blue-500 mt-2">{stats.totalPolicies}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Users</h3>
          <p className="text-3xl font-bold text-purple-500 mt-2">{stats.totalUsers}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Traffic Last 7 Days</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="date" tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip contentStyle={{backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff'}} />
                <Legend />
                <Line type="monotone" dataKey="Allowed" stroke="#10B981" strokeWidth={3} dot={{r: 4}} />
                <Line type="monotone" dataKey="Denied" stroke="#EF4444" strokeWidth={3} dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 w-full">Access Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff'}} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Total Requests / Day</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="date" tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip contentStyle={{backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff'}} />
                <Bar dataKey="Total" fill="#aa3bff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h3>
          </div>
          <div className="flex-1 overflow-auto max-h-64 p-0">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {recentActivity.length === 0 ? (
                  <tr>
                    <td className="px-6 py-4 text-center text-gray-500">No recent activity</td>
                  </tr>
                ) : (
                  recentActivity.map(log => (
                    <tr key={log._id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {log.userId?.username || 'Unknown'}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">
                        {log.resource}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-right">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          log.status === 'ALLOWED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
