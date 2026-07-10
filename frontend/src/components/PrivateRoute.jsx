import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const PrivateRoute = ({ allowedRole }) => {
    const { isAuthenticated, userType } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/register" replace />;
    }

    if (allowedRole && userType !== allowedRole) {
        return <Navigate to="/" replace />; // Or some unauthorized page
    }

    return <Outlet />;
};

export default PrivateRoute;
