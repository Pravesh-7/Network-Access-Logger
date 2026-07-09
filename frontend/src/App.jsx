import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Policies from './pages/Policies';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="policies" element={<Policies />} />
          {/* More routes will be added here */}
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;