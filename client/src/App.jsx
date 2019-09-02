import React, { useContext, useReducer, Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';

import Loader from './components/Loader';
import reducer from './context/reducer';
import GlobalContext from './context/GlobalContext';
import config from './firebaseConfig';

const Routes = lazy(() => import('./Routes'));

const App = () => {
  try {
    firebase.initializeApp(config);
  } catch (err) { }
  const initialState = useContext(GlobalContext);
  initialState.user = JSON.parse(localStorage.getItem('user'));
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes />
        </Suspense>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};

export default App;
