import React from 'react';
import { mount } from 'enzyme';

import '@testing-library/jest-dom/extend-expect';
import { Login } from './Login';
import { TestHelper } from '../helpers/testHelper';

describe('<Login />', () => {
  it('renders correctly', () => {
    const wrapper = mount(
      <TestHelper>
        <Login />
      </TestHelper>
    );

    expect(wrapper.html()).toMatchSnapshot();
  });
});
