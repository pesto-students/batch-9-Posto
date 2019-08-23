import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Routes from './Routes';
import Login from './views/Login';
import Signup from './views/Signup';
import New from './views/New';
import NoMatch from './views/NoMatch';

describe('<Routes />', () => {
  it('should render <Login /> for /login route', () => {
    const router = mount(
      <MemoryRouter initialEntries={['/login']}>
        <Routes />
      </MemoryRouter>,
    );
    expect(router.find(Login)).toHaveLength(1);
  });

  it('should render <Signup /> for /signup route', () => {
    const router = mount(
      <MemoryRouter initialEntries={['/signup']}>
        <Routes />
      </MemoryRouter>,
    );
    expect(router.find(Signup)).toHaveLength(1);
  });

  it('should render <New /> for /new route', () => {
    const router = mount(
      <MemoryRouter initialEntries={['/new']}>
        <Routes />
      </MemoryRouter>,
    );
    expect(router.find(New)).toHaveLength(1);
  });

  it('should render <NoMatch /> for undefined route', () => {
    const router = mount(
      <MemoryRouter initialEntries={['/yahoo']}>
        <Routes />
      </MemoryRouter>,
    );
    expect(router.find(NoMatch)).toHaveLength(1);
  });
});
