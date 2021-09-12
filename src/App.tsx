import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import Layout from './pages/layout';
import GlobalStyle from './styles/global';

import Routes from './routes';
import { AuthProvider } from './hooks/AuthContext';
import { ToastContainer } from 'react-toastify';
const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes />
          <ToastContainer theme="dark" />
        </AuthProvider>

        <GlobalStyle />
      </BrowserRouter>
    </>
  );
};

export default App;
