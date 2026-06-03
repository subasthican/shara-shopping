import { Navigate, useLocation } from 'react-router-dom';
import { hasValidAdminSession } from '../services/authService.js';

export default function ProtectedAdminRoute({ children }) {
  const location = useLocation();

  if (!hasValidAdminSession()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
