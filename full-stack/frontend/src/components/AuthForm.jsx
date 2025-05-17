
import React, { useState } from 'react';
import './AuthForm.css';

const BACKEND_URL = 'http://localhost:5000';

export default function AuthForm({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const endpoint = isRegister ? '/register' : '/login';

    try {
      const res = await fetch(BACKEND_URL + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Errore');
      } else {
        setMessage(data.message || 'Successo');
        if (!isRegister) {
          onLogin(data);
        } else {
          setIsRegister(false);
          setUsername('');
          setPassword('');
        }
      }
    } catch {
      setMessage('Errore di connessione al server');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-switch">
        <button
          className={isRegister ? '' : 'active'}
          onClick={() => { setMessage(null); setIsRegister(false); }}
        >
          Login
        </button>
        <button
          className={isRegister ? 'active' : ''}
          onClick={() => { setMessage(null); setIsRegister(true); }}
        >
          Registrati
        </button>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isRegister ? 'Registrati' : 'Accedi'}</h2>
        {message && <p className="auth-message">{message}</p>}

        <label>
          <span>Username</span>
          <input
            type="text"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
          />
        </label>

        <label>
          <span>Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete={isRegister ? 'new-password' : 'current-password'}
          />
        </label>

        <button type="submit" className="submit-btn">
          {isRegister ? 'Registrati' : 'Login'}
        </button>
      </form>
    </div>
);
}
