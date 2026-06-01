import { Navigate, useLocation } from 'react-router-dom';
import { getStoredAdmin } from '../services/authService.js';

export default function ProtectedAdminRoute({ children }) {
  const location = useLocation();
  const admin = getStoredAdmin();
  const token = localStorage.getItem('shara_admin_token');

  if (!admin || !token) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
