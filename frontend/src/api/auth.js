export async function signup(email, password) {
    const res = await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Sign up failed');
    }
  
    return res.json();
  }
  
  export async function login(email, password) {
    const res = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Login failed');
    }
  
    return res.json();
  }
  