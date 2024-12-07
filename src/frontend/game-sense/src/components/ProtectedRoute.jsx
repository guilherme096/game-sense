import React from 'react';
import { AuthProvider } from 'react-auth-kit';

export function ProtectedRoute({ children }) {
  return (
    <AuthProvider
      authType="cookie"
      authName="_auth"
      cookieDomain="localhost"
      cookieSecure={window.location.protocol === "https:"}
    >
      {children}
    </AuthProvider>
  );
}