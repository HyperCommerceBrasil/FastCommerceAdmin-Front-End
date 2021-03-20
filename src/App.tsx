import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import Layout from './pages/layout';
import GlobalStyle from './styles/global';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
          <Routes />

        {/* <Layout> */}
        {/* </Layout> */}

        <GlobalStyle />
      </BrowserRouter>
    </>
  );
};

export default App;
