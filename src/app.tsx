import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import { IState } from 'shared/interface/state';
import Login from 'features/auth/container/login';
import ForgotPassword from 'features/auth/component/forgotPassword';
import ResetPassword from 'features/auth/component/resetPassword';
import Dashboard from 'features/dashboard/container/dashboardContainer';
import AuthService from 'shared/services/auth.service';

const App: React.FC = () => {
    const isLogin: boolean = AuthService.isLogin();

    if (isLogin) {
        return (
            <Routes>
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        );
    } else {
        return (
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route
                    path='/reset-password/:token'
                    element={<ResetPassword />}
                />
                <Route path='*' element={<Navigate replace to='/login' />} />
            </Routes>
        );
    }
};

export default App;
