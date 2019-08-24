import React from 'react';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';

import Login from './views/Login';
import Signup from './views/Signup';
import New from './views/New';
import NoMatch from './views/NoMatch';
import Home from './views/Home';
import CategoryPage from './views/Category';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/home" component={Home} />
      <Route path="/new" component={New} />
      <Route path="/category/:name" component={CategoryPage} />
      <Route component={NoMatch} />
    </Switch>
  );
}

export default Routes;
