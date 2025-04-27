import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
const api_url = import.meta.env.VITE_API_URL;

const ProtectedRoute = ({ children, adminOnly = false, superAdminOnly = false }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${api_url}/api/auth/profile`, { withCredentials: true });
        setUser(res.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (superAdminOnly && user.role !== 'superadmin') {
    return <Navigate to="/" />;
  }

  // Update access check for admins
  if (adminOnly && !['admin', 'superadmin'].includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
