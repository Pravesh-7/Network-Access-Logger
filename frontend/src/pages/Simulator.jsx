import { useState } from 'react';
import { checkAccess } from '../services/accessService';
import { FiPlay, FiCheckCircle, FiXCircle, FiClock, FiFileText, FiShield } from 'react-icons/fi';

const Simulator = () => {
  const [resource, setResource] = useState('');
  const [action, setAction] = useState('GET');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSimulate = async (e) => {
    e.preventDefault();
    if (!resource) return;
    
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      const response = await checkAccess({ resource, action });
      setResult(response);
    } catch (err) {
      if (err.response && err.response.data) {
        setResult(err.response.data);
      } else {
        setError('An unexpected error occurred during simulation.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Access Simulator</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Test your configured policies by simulating network access requests.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Request Parameters</h2>
          <form onSubmit={handleSimulate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Resource Path</label>
              <input 
                type="text" 
                required 
                value={resource} 
                onChange={(e) => setResource(e.target.value)} 
                placeholder="e.g. /api/financials" 
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Action (Optional)</label>
              <select 
                value={action} 
                onChange={(e) => setAction(e.target.value)} 
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
              >
                <option value="GET">GET (Read)</option>
                <option value="POST">POST (Create)</option>
                <option value="PUT">PUT (Update)</option>
                <option value="DELETE">DELETE (Remove)</option>
              </select>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-primary hover:bg-purple-700 text-white font-medium py-3 rounded-lg flex justify-center items-center transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Simulating...' : <><FiPlay className="mr-2" /> Check Access</>}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Simulation Results</h2>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}
          
          {!result && !error && !loading && (
            <div className="h-64 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400">
              <FiShield className="text-4xl mb-3 text-gray-300 dark:text-gray-600" />
              <p>Run a simulation to see results here</p>
            </div>
          )}

          {result && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden animate-slide-up">
              <div className={`p-6 flex items-center justify-between border-b ${result.message === 'Access Granted' ? 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/50' : 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/50'}`}>
                <div className="flex items-center">
                  {result.message === 'Access Granted' ? (
                    <FiCheckCircle className="text-green-500 text-3xl mr-3" />
                  ) : (
                    <FiXCircle className="text-red-500 text-3xl mr-3" />
                  )}
                  <h3 className={`text-xl font-bold ${result.message === 'Access Granted' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                    {result.message}
                  </h3>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-start">
                  <FiClock className="text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Timestamp</p>
                    <p className="text-gray-900 dark:text-white">{new Date(result.timestamp).toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiFileText className="text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Reason</p>
                    <p className="text-gray-900 dark:text-white">{result.reason}</p>
                  </div>
                </div>

                {result.matchedPolicy && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Matched Policy Details</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500 dark:text-gray-400">Name:</div>
                      <div className="text-gray-900 dark:text-white font-medium">{result.matchedPolicy.name}</div>
                      <div className="text-gray-500 dark:text-gray-400">Role:</div>
                      <div className="text-gray-900 dark:text-white">{result.matchedPolicy.role}</div>
                      <div className="text-gray-500 dark:text-gray-400">Action:</div>
                      <div className="text-gray-900 dark:text-white">{result.matchedPolicy.action}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Simulator;
