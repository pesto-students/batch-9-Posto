import React from 'react';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';

import Login from './views/Login';
import Signup from './views/Signup';
import CreateAndEditPost from './views/CreateAndEditPost';
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
      <Route path="/new" component={CreateAndEditPost} />
      <Route path="/category/:name" component={CategoryPage} />
      <Route path="/edit/:postId" component={CreateAndEditPost} />
      <Route component={NoMatch} />
    </Switch>
  );
}

export default Routes;
