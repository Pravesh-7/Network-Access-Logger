import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Policies from './pages/Policies';
import AccessLogs from './pages/AccessLogs';
import Simulator from './pages/Simulator';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route element={<ProtectedRoute allowedRoles={['Admin', 'Security Analyst']} />}>
            <Route index element={<Dashboard />} />
            <Route path="policies" element={<Policies />} />
            <Route path="logs" element={<AccessLogs />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['Admin', 'Security Analyst', 'Employee']} />}>
            <Route path="simulator" element={<Simulator />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;