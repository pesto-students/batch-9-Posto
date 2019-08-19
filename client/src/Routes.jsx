import React from 'react';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';

import Login from './views/Login';
import Signup from './views/Signup';
import NoMatch from './views/NoMatch';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route component={NoMatch} />
    </Switch>
  );
}

export default Routes;
