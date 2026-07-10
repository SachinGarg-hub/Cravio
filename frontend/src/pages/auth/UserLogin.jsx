import React from 'react';
import '../../styles/auth-shared.css';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import toast from 'react-hot-toast';

const UserLogin = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const toastId = toast.loading('Signing in...');

    try {
      const response = await axiosInstance.post("/auth/user/login", {
        email,
        password
      });

      login(response.data.user, 'user');
      toast.success(response.data.message, { id: toastId });
      navigate("/"); // Redirect to home after login
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed", { id: toastId });
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="user-login-title">
        <header>
          <h1 id="user-login-title" className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to continue your food journey.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" />
          </div>
          <button className="auth-submit" type="submit">Sign In</button>
        </form>
        <div className="auth-alt-action">
          New here? <a href="/user/register">Create account</a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
