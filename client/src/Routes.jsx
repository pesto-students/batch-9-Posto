import React, { useContext, lazy, Suspense } from 'react';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';

import GlobalContext from './context/GlobalContext';
import Login from './views/Login';
import Signup from './views/Signup';
import NoMatch from './views/NoMatch';
import Loader from './components/Loader';

const CreateAndEditPost = lazy(() => import('./views/CreateAndEditPost'));
const Home = lazy(() => import('./views/Home'));
const CategoryPage = lazy(() => import('./views/Category'));
const Search = lazy(() => import('./views/Search'));
const MyPosts = lazy(() => import('./views/MyPosts'));

function LazyRoute(Component) {
  return props => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
};

const routes = [
  {
    path: '/',
    component: LazyRoute(Home),
  },
  {
    path: '/new',
    component: LazyRoute(CreateAndEditPost),
  },
  {
    path: '/edit/:postId',
    component: LazyRoute(CreateAndEditPost),
  },
  {
    path: '/search',
    component: LazyRoute(Search),
  },
  {
    path: '/category/:name',
    name: 'CategoryPage',
    component: LazyRoute(CategoryPage),
  },
  {
    path: '/my-posts',
    name: 'MyPosts',
    component: LazyRoute(MyPosts),
  },
];

function Routes() {
  const { state } = useContext(GlobalContext);
  return (
    !state.user || !state.user.token
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
          {
            routes.map((route) => <Route exact path={route.path} component={route.component} key={route.path} />)
          }
          <Route component={NoMatch} />
        </Switch>
      )
  );
}

export default Routes;
