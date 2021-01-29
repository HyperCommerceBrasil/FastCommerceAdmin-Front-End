import React from 'react';
import { Switch } from 'react-router-dom';

import { Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={Dashboard} exact />
  </Switch>
);

export default Routes;
