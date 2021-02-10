import React from 'react';
import { mount } from 'enzyme';

// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom/extend-expect';
import { Navbar } from './Navbar';
import { TestHelper } from '../helpers/testHelper';

describe('<Navbar />', () => {
  it('renders correctly', () => {
    const wrapper = mount(
      <TestHelper>
        <Navbar />
      </TestHelper>
    );

    expect(wrapper.html()).toMatchSnapshot();
  });
});
