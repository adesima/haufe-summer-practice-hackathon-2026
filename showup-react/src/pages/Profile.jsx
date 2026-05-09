import { useEffect, useState } from 'react';
import { getUserById, getSports, updateUserProfile } from '../utils/firestore-db';

export default function Profile() {
  const [userId, setUserId] = useState('');
  const [sports, setSports] = useState([]);
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    description: '',
    preferences: [],
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
      if (!currentUser?.id) return;
      setUserId(currentUser.id);
      const [userFromDb, sportsData] = await Promise.all([getUserById(currentUser.id), getSports()]);
      setSports(sportsData);
      const user = userFromDb || currentUser;
      setForm({
        name: user.name || '',
        username: user.username || '',
        password: user.password || '',
        email: user.email || '',
        description: user.description || '',
        preferences: user.preferences || [],
      });
    };
    loadUser();
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

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

  const handleSave = async (e) => {
    e.preventDefault();
    if (!userId) return;
    setError('');
    setMessage('');
    setSaving(true);

    const payload = {
      name: form.name.trim(),
      username: form.username.trim(),
      password: form.password,
      email: form.email.trim(),
      description: form.description.trim(),
      preferences: form.preferences,
    };

    const result = await updateUserProfile(userId, payload);
    setSaving(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, ...payload }));
    setMessage('Profile saved successfully.');
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSave} style={styles.form}>
        <h2 style={styles.title}>My Profile</h2>
        <input type="text" value={form.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Name" style={styles.input} />
        <input type="text" value={form.username} onChange={(e) => handleChange('username', e.target.value)} placeholder="Username" style={styles.input} />
        <input type="text" value={form.password} onChange={(e) => handleChange('password', e.target.value)} placeholder="Password" style={styles.input} />
        <input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="Email" style={styles.input} />
        <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} placeholder="Description" style={styles.textarea} />
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
        {error && <div style={styles.error}>{error}</div>}
        {message && <div style={styles.message}>{message}</div>}
        <button type="submit" style={styles.button} disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
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
  button: {
    padding: '12px 0',
    fontSize: 16,
    borderRadius: 6,
    border: 'none',
    background: '#007bff',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
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
  message: {
    color: '#1f5d99',
    textAlign: 'center',
    fontSize: 14,
  },
  error: {
    color: '#d32f2f',
    textAlign: 'center',
    fontSize: 14,
  },
};
