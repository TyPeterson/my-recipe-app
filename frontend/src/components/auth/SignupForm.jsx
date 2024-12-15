import React, { useState } from 'react';
import { signup as signupAPI } from '../../api/auth';
import { useAuth } from '../../hooks/useAuth';

export default function SignupForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const { user, token } = await signupAPI(email, password);
      login(user, token); // after signup, log the user in automatically
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Password:</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}
