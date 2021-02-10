import React from 'react';
import { mount } from 'enzyme';

import '@testing-library/jest-dom/extend-expect';
import { Home } from './Home';
import { TestHelper } from '../helpers/testHelper';

describe('<Home />', () => {
  it('renders correctly', () => {
    const wrapper = mount(
      <TestHelper>
        <Home />
      </TestHelper>
    );

    expect(wrapper.html()).toMatchSnapshot();
  });
});
