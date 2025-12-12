import React, { useState } from 'react';

const AuthForm = ({ type, onSubmit, isLoading, apiError }) => {
  const isSignup = type === 'signup';
  const availableRoles = ['pseb', 'hr', 'mentor', 'intern']; 

  const initialFormState = isSignup
    ? { name: '', email: '', password: '', role: availableRoles[0] || '' } 
    : { email: '', password: '' };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} data-mode={type}>
      {apiError && <div className="error-message">{apiError}</div>}

      {isSignup && (
        <>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role">Your Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              {availableRoles.map(role => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      <div className="form-group">
        <label htmlFor="email">Work email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@company.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="form-button"
      >
        {isLoading
          ? (isSignup ? 'Signing Up...' : 'Logging In...')
          : (isSignup ? 'Sign up' : 'Log in')}
      </button>

      <div className="or-divider">Or continue with</div>
      <div className="social-container">
        <button type="button" className="social-button">Google</button>
        <button type="button" className="social-button">Microsoft</button>
      </div>
    </form>
  );
};

export default AuthForm;
