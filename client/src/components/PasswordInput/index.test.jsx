import React from 'react';
import { shallow } from 'enzyme';

import PasswordInput from './index';

describe('<PasswordInput />', () => {
  it('pattern matches with user password when verify is true', () => {
    const userPassword = 'P@ssw0rd';
    const passwordInput = shallow(<PasswordInput verify userPassword={userPassword} />);
    expect(passwordInput.props().pattern).toBe(userPassword);
  });
  it('pattern matches with pattern', () => {
    const passwordInput = shallow(<PasswordInput />);
    expect(passwordInput.props().pattern).toBe('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$');
  });
});
