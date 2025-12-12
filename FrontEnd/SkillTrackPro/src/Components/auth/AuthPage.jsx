import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/Axiosconfig.jsx';   // your axios instance
import Header from '../common/Header.jsx';
import Footer from '../common/Footer.jsx';
import AuthForm from './AuthForm.jsx';

const AuthPage = ({ type }) => {
  const isSignup = type === 'signup';
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const BASE_PATH = "/auth";

  const handleAuth = async (formData) => {
    setIsLoading(true);
    setApiError(null);

    const endpoint = isSignup ? "/signup" : "/login";
    const url = `${BASE_PATH}${endpoint}`;

    const payload = isSignup
      ? formData
      : { email: formData.email, password: formData.password };

    try {
      const response = await api.post(url, payload);

      if (response.status === 200 || response.status === 201) {
        if (isSignup) {
          alert('Signup successful! Redirecting to login.');
          window.location.href = '/login';
        } else {
          const token = response.data.token;
          const role = (response.data.role || "").toString().toLowerCase(); // defensive
          if (token) {
            localStorage.setItem('token', token);
            if (role) localStorage.setItem('role', role);
            // redirect to the generic /dashboard - DashboardRouter will forward to role path
            window.location.href = '/dashboard';
          } else {
            throw new Error("Login failed: Token missing.");
          }
        }
      }
    } catch (error) {
      console.error(`${type} error:`, error);
      setApiError(error.response?.data?.detail || `An error occurred during ${type}.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="page-wrapper"> 
      <Header /> 
      
      <main id="main-content">
        <div className="content-wrapper">
          <div className="left-panel">
            <h1 className="headline">
              Internship Task Tracker Done By SkillTrackPro
            </h1>
            <p className="subtext">
              Report, track, and manage your internship tasks efficiently.
            </p>

            <div className="form-wrapper">
              <AuthForm
                type={type}
                onSubmit={handleAuth}
                isLoading={isLoading}
                apiError={apiError}
              />
            </div>

            <div className="switch-link">
              {isSignup ? (
                <p>Already have an account? <Link to="/login">Log in</Link></p>
              ) : (
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
              )}
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="privacy-link">
            <h1>SkillTrackPro</h1>
            <p>
              Welcome to the PSEB Internship Management System — a unified platform where interns 
              can track tasks and progress, and PSEB HR & mentors can monitor performance, 
              communicate, and manage activities efficiently.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthPage;
