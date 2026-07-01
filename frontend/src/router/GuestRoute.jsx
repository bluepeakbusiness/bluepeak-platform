import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function GuestRoute() {
  const { token, loading } = useAuth();

  if (loading) return null;
  return token ? <Navigate to="/" replace /> : <Outlet />;
}
