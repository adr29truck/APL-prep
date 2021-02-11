import React from 'react';
import { mount } from 'enzyme';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom/extend-expect';
import ActivityDropdown from './ActivityDropdown';
import { TestHelper } from '../../helpers/testHelper';

describe('<ActivityDropdown />', () => {
  it('renders correctly', () => {
    const x = jest.fn()

    const wrapper = mount(
      <TestHelper>
        <ActivityDropdown onClickButton={x} />
      </TestHelper>
    );

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('handles right click correctly', () => {
    const x = jest.fn()

    render(
      <TestHelper>
        <ActivityDropdown onClickButton={x} />
      </TestHelper>
    );

    expect(screen.getByText('Submit', { exact: false }));
    userEvent.click(screen.getByText('Submit', { exact: false }))
    expect(x).toHaveBeenCalledTimes(1)
  });
});
