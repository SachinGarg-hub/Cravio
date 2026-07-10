import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegister from '../pages/auth/UserRegister';
import ChooseRegister from '../pages/auth/ChooseRegister';
import UserLogin from '../pages/auth/UserLogin';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';
import Home from '../pages/general/Home';
import Saved from '../pages/general/Saved';
import BottomNav from '../components/BottomNav';
import CreateFood from '../pages/food-partner/CreateFood';
import Profile from '../pages/food-partner/Profile';
import PrivateRoute from '../components/PrivateRoute';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/register" element={<ChooseRegister />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
                <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
                
                {/* Home doesn't need to be strictly private for reading, but interacting might require auth */}
                <Route path="/" element={<><Home /><BottomNav /></>} />

                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/saved" element={<><Saved /><BottomNav /></>} />
                    <Route path="/food-partner/:id" element={<Profile />} />
                </Route>

                <Route element={<PrivateRoute allowedRole="partner" />}>
                    <Route path="/create-food" element={<CreateFood />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes