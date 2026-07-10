import React from 'react';
import '../../styles/auth-shared.css';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import toast from 'react-hot-toast';

const FoodPartnerLogin = () => {

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const toastId = toast.loading('Signing in...');

    try {
      const response = await axiosInstance.post('/auth/food-partner/login', {
        email,
        password
      });

      login(response.data.foodPartner, 'partner');
      toast.success(response.data.message, { id: toastId });
      
      // Redirect to food partner profile
      navigate(`/food-partner/${response.data.foodPartner._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed", { id: toastId });
      console.error(error);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="partner-login-title">
        <header>
          <h1 id="partner-login-title" className="auth-title">Partner login</h1>
          <p className="auth-subtitle">Access your dashboard and manage orders.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="business@example.com" autoComplete="email" />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="Password" autoComplete="current-password" />
          </div>
          <button className="auth-submit" type="submit">Sign In</button>
        </form>
        <div className="auth-alt-action">
          New partner? <a href="/food-partner/register">Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
