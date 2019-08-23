import React from 'react';
import { shallow } from 'enzyme';

import WritePost from './index';

describe('<WritePost />', () => {
  it('renders <div id="message" /> when publishDisabled is false', () => {
    const props = {
      title: '',
      content: '',
      category: '',
      onTitleChange: () => {},
      onContentChange: () => {},
    };
    const wrapper = shallow(<WritePost {...props} />);
    const message = wrapper.find('div');
    expect(message).toHaveLength(3);
  });
});
