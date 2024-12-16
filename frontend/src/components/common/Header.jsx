import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center', 
      padding: '1rem', 
      background: '#f5f5f5', 
      borderBottom: '1px solid #ddd'
    }}>
      <div><strong>My Recipe App</strong></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {user && <span>{user.email}</span>}
        {user && <button onClick={logout}>Logout</button>}
      </div>
    </header>
  );
}
