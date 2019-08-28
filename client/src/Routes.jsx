import React, { useContext } from 'react';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';

import GlobalContext from './context/GlobalContext';
import Login from './views/Login';
import Signup from './views/Signup';
import CreateAndEditPost from './views/CreateAndEditPost';
import NoMatch from './views/NoMatch';
import Home from './views/Home';
import CategoryPage from './views/Category';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/new',
    component: CreateAndEditPost,
  },
  {
    path: '/edit/:postId',
    component: CreateAndEditPost,
  },
  {
    path: '/category/:name',
    name: 'CategoryPage',
    component: CategoryPage,
  },
];

function Routes() {
  const { state } = useContext(GlobalContext);
  const user = state.user || JSON.parse(localStorage.getItem('user'));
  console.log(user);
  return (
    !user || !user.token
      ? (
        <>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            {
              routes.map((route) => <Route path={route.path} render={() => <Redirect to="/login" />} key={route.path} />)
            }
          </Switch>
        </>
      )
      : (
        <Switch>
          <Route path="/login" render={() => <Redirect to="/" />} />
          <Route path="/signup" render={() => <Redirect to="/" />} />
          <Route exact path="/" component={Home} />
          <Route path="/new" component={CreateAndEditPost} />
          <Route path="/category/:name" component={CategoryPage} />
          <Route path="/edit/:postId" component={CreateAndEditPost} />
          <Route component={NoMatch} />
        </Switch>
      )
  );
}

export default Routes;
