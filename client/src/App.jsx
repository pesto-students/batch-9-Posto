import React, { useContext, useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';
import reducer from './context/reducer';
import GlobalContext from './context/GlobalContext';

const App = () => {
  const initialState = useContext(GlobalContext);
  initialState.user = JSON.parse(localStorage.getItem('user'));
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};

export default App;
