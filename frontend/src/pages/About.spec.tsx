import React from 'react';
import { mount } from 'enzyme';

import '@testing-library/jest-dom/extend-expect';
import { About } from './About';
import { TestHelper } from '../helpers/testHelper';

describe('<About />', () => {
  it('renders correctly', () => {
    const wrapper = mount(
      <TestHelper>
        <About />
      </TestHelper>
    );

    expect(wrapper.html()).toMatchSnapshot();
  });
});
