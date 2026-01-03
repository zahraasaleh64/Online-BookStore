import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { baselightTheme } from './theme/DefaultColors';
import { Outlet } from 'react-router-dom';

const DashboardRoot = () => {
  return (
    <ThemeProvider theme={baselightTheme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
};

export default DashboardRoot;
