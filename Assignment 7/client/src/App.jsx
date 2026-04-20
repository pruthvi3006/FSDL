import React, { useEffect, useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import LoginForm from './components/LoginForm';
import { fetchFeedbacks, submitFeedback } from './api.jsx';
import './App.css';

function App() {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('sfs_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetchFeedbacks()
      .then((data) => {
        setFeedbacks(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load feedbacks.');
        setLoading(false);
      });
  }, [user]);

  const handleLogin = (nextUser) => {
    setUser(nextUser);
    try {
      localStorage.setItem('sfs_user', JSON.stringify(nextUser));
    } catch {
      // ignore storage errors
    }
    setError('');
    setLoading(true);
  };

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem('sfs_user');
    } catch {
      // ignore storage errors
    }
    setFeedbacks([]);
    setError('');
    setLoading(false);
  };

  const handleSubmit = async (formData) => {
    try {
      const newFeedback = await submitFeedback(formData);
      setFeedbacks((prev) => [newFeedback, ...prev]);
      setError('');
    } catch (err) {
      setError('Unable to submit feedback.');
    }
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Student Feedback Review</h1>
          <p>Collect student feedback for courses and instructors.</p>
        </div>

        <div className="user-chip">
          <div className="user-chip-meta">
            <div className="user-chip-name">{user.name || user.email}</div>
            <div className="user-chip-role">{user.role}</div>
          </div>
          <button className="ghost-btn" type="button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      <main>
        <FeedbackForm onSubmit={handleSubmit} />
        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <div className="loading">Loading feedbacks...</div>
        ) : (
          <FeedbackList feedbacks={feedbacks} />
        )}
      </main>
    </div>
  );
}

export default App;
