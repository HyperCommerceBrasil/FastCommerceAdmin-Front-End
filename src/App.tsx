import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import Layout from './pages/layout';
import GlobalStyle from './styles/global';

import Routes from './routes';
import { AuthProvider } from './hooks/AuthContext';
const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
      <AuthProvider>
         <Routes />
      </AuthProvider>
         
        <GlobalStyle />
      </BrowserRouter>
    </>
  );
};

export default App;
