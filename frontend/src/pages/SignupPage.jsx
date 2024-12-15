import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';
import { useAuth } from '../hooks/useAuth';

export default function SignupPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/recipes" />;
  }

  return (
    <div>
      <SignupForm />
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
