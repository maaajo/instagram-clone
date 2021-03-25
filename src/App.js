import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/signup'));
const NotFound = lazy(() => import('./pages/notfound'));
const Dashboard = lazy(() => import('./pages/dashboard'));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route exact path={ROUTES.DASHBOARD} component={Dashboard}></Route>
          <Route path={ROUTES.LOGIN} component={Login}></Route>
          <Route path={ROUTES.SIGN_UP} component={SignUp}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
