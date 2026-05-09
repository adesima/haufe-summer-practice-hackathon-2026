import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../utils/firestore-db';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await authenticateUser(identifier, password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate('/home');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Login</h2>
        <input
          type="text"
          placeholder="Identifier (username or email)"
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        {error && <div style={styles.error}>{error}</div>}
        <button type="submit" style={styles.button}>Login</button>
        <div style={styles.registerMessage}>Don't have an account yet? Register now</div>
        <button
          type="button"
          style={styles.secondaryButton}
          onClick={() => navigate('/register')}
        >
          Create account
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f7f7f7',
  },
  form: {
    width: '100%',
    maxWidth: 350,
    padding: 24,
    borderRadius: 12,
    background: '#fff',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  title: {
    margin: 0,
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 28,
    color: '#222',
  },
  input: {
    padding: '12px 14px',
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ddd',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '12px 0',
    fontSize: 16,
    borderRadius: 6,
    border: 'none',
    background: '#007bff',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: 8,
  },
  secondaryButton: {
    padding: '12px 0',
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #007bff',
    background: '#fff',
    color: '#007bff',
    fontWeight: 600,
    cursor: 'pointer',
  },
  registerMessage: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
  error: {
    color: '#d32f2f',
    fontSize: 15,
    textAlign: 'center',
  },
};
