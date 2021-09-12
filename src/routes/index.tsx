import React, { Suspense, lazy } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Switch } from 'react-router-dom';

import Route from './Route';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Collections = lazy(() => import('../pages/Colections'));
const ListProducts = lazy(() => import('../pages/Products/ListProducts'));
const ListCustomer = lazy(() => import('../pages/Customer/ListCustomer'));
const UpdateCustomer = lazy(() => import('../pages/Customer/UpdateCustomer'));

const NewProduct = lazy(() => import('../pages/Products/NewProduct'));
const Register = lazy(() => import('../pages/Register'));
const Login = lazy(() => import('../pages/Login'));

const UpdateProduct = lazy(() => import('../pages/Products/UpdateProduct/'));

const ListOrders = lazy(() => import('../pages/Orders/ListOrders'));
const OrderDetail = lazy(() => import('../pages/Orders/OrderDetail'));

const ListSupplier = lazy(() => import('../pages/Supplier'));

const LoadingBackground: React.FC = () => (
  <Backdrop
    open
    style={{
      zIndex: 0,
      display: 'flex',
      flexDirection: 'column',
      color: 'white',
    }}
  >
    <CircularProgress color="inherit" />
    <span color="white">Carregando Aguarde ...</span>
  </Backdrop>
);

const Routes: React.FC = () => (
  <Switch>
    <Suspense fallback={<LoadingBackground />}>
      <Route path="/" component={() => <Dashboard />} exact />
      <Route path="/collections" isPrivate component={() => <Collections />} />
      <Route
        path="/products"
        isPrivate
        component={() => <ListProducts />}
        exact
      />
      <Route
        path="/customers"
        isPrivate
        component={() => <ListCustomer />}
        exact
      />
      <Route
        path="/customers/update/:idCustomer"
        isPrivate
        component={() => <UpdateCustomer />}
      />

      <Route
        path="/products/new"
        isPrivate
        component={() => <NewProduct />}
        exact
      />

      <Route
        path="/products/update/:idProduct"
        isPrivate
        component={() => <UpdateProduct />}
        exact
      />

      <Route path="/orders" exact isPrivate component={() => <ListOrders />} />
      <Route
        path="/orders/:orderId"
        isPrivate
        component={() => <OrderDetail />}
      />

      <Route path="/register" component={() => <Register />} exact />
      <Route
        path="/suppliers"
        isPrivate
        component={() => <ListSupplier />}
        exact
      />
      <Route
        path="/login"
        isPrivate={false}
        component={() => <Login />}
        exact
      />
    </Suspense>
  </Switch>
);

export default Routes;
