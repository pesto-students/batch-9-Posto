import React from 'react';
import { shallow } from 'enzyme';

import New from './index';
import WritePost from '../../components/WritePost';

describe('<New />', () => {
  it('renders <WritePost /> when activeTab is \'write\'', () => {
    const wrapper = shallow(<New />);
    wrapper.find('PostMenu').prop('handleWriteClick')();
    const writePost = wrapper.find(WritePost);
    expect(writePost).toHaveLength(1);
  });

  it('does not render <WritePost /> when activeTab is not \'write\'', () => {
    const wrapper = shallow(<New />);
    wrapper.find('PostMenu').prop('handlePreviewClick')();
    const writePost = wrapper.find(WritePost);
    expect(writePost).toHaveLength(0);

    wrapper.find('PostMenu').prop('handleHelpClick')();
    expect(writePost).toHaveLength(0);
  });
});
