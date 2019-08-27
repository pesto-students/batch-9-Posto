import React from 'react';
import { shallow } from 'enzyme';

import BlogList from './index';

it('BlogList renders without crashing', () => {
  const wrapper = shallow(<BlogList />);
  expect(wrapper.exists()).toBe(true);
});
