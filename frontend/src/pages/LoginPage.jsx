import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/recipes" />;
  }

  return (
    <div>
      <LoginForm />
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}
