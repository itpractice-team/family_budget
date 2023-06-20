import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {
  const isLogin = useSelector((state) => state.login.login);

  if (!isLogin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
