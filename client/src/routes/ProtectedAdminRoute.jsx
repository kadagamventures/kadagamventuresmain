import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '../zustand/useAuthStore'

const ProtectedAdminRoute = () => {
    const { isAuthenticated } = useAuthStore();

    return !isAuthenticated
        ? <Outlet />
        : <Navigate to="/admin/login" replace />;
};

export default ProtectedAdminRoute