import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import Login from 'features/auth/container/login';
import ForgotPassword from 'features/auth/component/forgotPassword';
import ResetPassword from 'features/auth/component/resetPassword';

import { IState } from 'shared/interface/state';
import DashboardContainer from 'features/dashboard/container/dashboardContainer';
import Dashboard from 'features/dashboard/component/dashboard';

const App: React.FC = () => {
    const isLogin: boolean = useSelector((state: IState) => state.auth.isLogin);

    if (isLogin) {
        return <></>;
    } else {
        return (
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/dashboard' element={<Dashboard />} />
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
