import React, { useMemo, useState } from 'react';

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [submitting, setSubmitting] = useState(false);

  const errors = useMemo(() => {
    const next = {};
    if (!email.trim()) next.email = 'Email is required.';
    else if (!isValidEmail(email.trim())) next.email = 'Enter a valid email.';
    if (!password) next.password = 'Password is required.';
    else if (password.length < 4) next.password = 'Password must be at least 4 characters.';
    return next;
  }, [email, password]);

  const canSubmit = Object.keys(errors).length === 0 && !submitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      await Promise.resolve(
        onLogin?.({
          email: email.trim().toLowerCase(),
          role,
          name: email.split('@')[0] || 'User'
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Student Feedback System</h1>
          <p className="auth-subtitle">Sign in to submit and review feedback.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field-label">Email</span>
            <input
              className="field-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              placeholder="you@school.edu"
              autoComplete="email"
              inputMode="email"
            />
            {touched.email && errors.email && <span className="field-error">{errors.email}</span>}
          </label>

          <label className="field">
            <span className="field-label">Password</span>
            <input
              className="field-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            {touched.password && errors.password && (
              <span className="field-error">{errors.password}</span>
            )}
          </label>

          <label className="field">
            <span className="field-label">Role</span>
            <select className="field-input" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <button className="primary-btn" type="submit" disabled={!canSubmit}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>

          <p className="auth-hint">
            Demo login: enter any email and a password of 4+ characters.
          </p>
        </form>
      </div>
    </div>
  );
}

