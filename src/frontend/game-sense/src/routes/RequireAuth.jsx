import { useIsAuthenticated, useSignOut } from 'react-auth-kit';
import { Navigate } from 'react-router-dom';

export const RequireAuth = ({children}) => {
  const isAuthenticated = useIsAuthenticated();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
}