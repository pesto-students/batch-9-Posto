import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './views/Login';
import Signup from './views/Signup';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/new-post" component={Login} />
        <Route path="/edit-post" component={Login} />
        <Route path="/search" component={Login} />
      </Switch>
    </>
  );
}

export default App;
