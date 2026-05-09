import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserAccount, getSports } from '../utils/firestore-db';

export default function Register() {
  const navigate = useNavigate();
  const [sports, setSports] = useState([]);
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    description: '',
    preferences: [],
    skillLevel: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSports = async () => {
      const data = await getSports();
      setSports(data);
    };
    loadSports();
  }, []);

  const togglePreference = (sportId) => {
    setForm((prev) => {
      const hasSport = prev.preferences.includes(sportId);
      return {
        ...prev,
        preferences: hasSport
          ? prev.preferences.filter((id) => id !== sportId)
          : [...prev.preferences, sportId],
      };
    });
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.preferences.length === 0) {
      setError('Please select at least one sport.');
      return;
    }

    setLoading(true);
    const result = await createUserAccount(form);
    setLoading(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(result.user));
    navigate('/home');
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Create Account</h2>
        <input
          type="text"
          placeholder="Full name"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => handleChange('username', e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => handleChange('password', e.target.value)}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Short description"
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          style={styles.textarea}
          required
        />

        <div style={styles.sectionLabel}>Sports preferences</div>
        <div style={styles.preferencesWrap}>
          {sports.map((sport) => (
            <label key={sport.id} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={form.preferences.includes(sport.id)}
                onChange={() => togglePreference(sport.id)}
              />
              <span>{sport.name}</span>
            </label>
          ))}
        </div>

        <select
          value={form.skillLevel}
          onChange={(e) => handleChange('skillLevel', e.target.value)}
          style={styles.input}
        >
          <option value="">Skill level (optional)</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        {error && <div style={styles.error}>{error}</div>}
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>
        <button
          type="button"
          style={styles.secondaryButton}
          onClick={() => navigate('/login')}
        >
          Back to login
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
    padding: 16,
  },
  form: {
    width: '100%',
    maxWidth: 420,
    padding: 24,
    borderRadius: 12,
    background: '#fff',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  title: {
    margin: 0,
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 28,
    color: '#222',
    marginBottom: 4,
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
  textarea: {
    padding: '12px 14px',
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ddd',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    minHeight: 80,
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  sectionLabel: {
    fontSize: 14,
    color: '#444',
    fontWeight: 600,
  },
  preferencesWrap: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 8,
    padding: 10,
    border: '1px solid #ddd',
    borderRadius: 6,
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 14,
    color: '#333',
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
    marginTop: 4,
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
  error: {
    color: '#d32f2f',
    fontSize: 15,
    textAlign: 'center',
  },
};
