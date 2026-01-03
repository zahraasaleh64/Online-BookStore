import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { baselightTheme } from './modernize/theme/DefaultColors';
import DashboardRoot from './modernize/DashboardRoot';
import FullLayout from './modernize/layouts/full/FullLayout';
import Dashboard from './modernize/views/dashboard/Dashboard';
import Login from './modernize/views/authentication/Login';
import ProductList from './modernize/views/products/ProductList';
import ProductForm from './modernize/views/products/ProductForm';
import OrdersList from './modernize/views/orders/OrdersList';

// A simple mock for authentication
const ProtectedRoute = ({ isAuthenticated }) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (e) => {
        // Basic mock login - in a real app, you'd verify credentials here
        setIsAuthenticated(true);
    };

    return (
        <ThemeProvider theme={baselightTheme}>
            <CssBaseline />
            <Router basename="/admin">
                <Routes>
                    <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />} />

                    <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                        <Route path="/" element={<DashboardRoot />}>
                            <Route element={<FullLayout />}>
                                <Route index element={<Dashboard />} />
                                {/* Add other dashboard routes here as needed */}
                                <Route path="dashboard" element={<Dashboard />} />
                                <Route path="products" element={<ProductList />} />
                                <Route path="products/add" element={<ProductForm />} />
                                <Route path="products/edit/:id" element={<ProductForm />} />
                                <Route path="orders" element={<OrdersList />} />
                            </Route>
                        </Route>
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
