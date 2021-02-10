import React from 'react';
import { mount } from 'enzyme';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom/extend-expect';
import Header from './Header';
import { TestHelper } from '../../helpers/testHelper';

// Must mock the date class else it would fail the snapshots
class MockDate extends Date {
  constructor() {
    super('2020-05-14T11:01:58.135Z');
  }
}
// @ts-ignore
global.Date = MockDate;

describe('<Header />', () => {
  it('renders correctly', () => {
    const wrapper = mount(
      <TestHelper>
        <Header />
      </TestHelper>
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('handles right click correctly', () => {
    const temp = new Date()
    const date = temp.getDate()
    const today = date < 10 ? '0'+date : date
    const tomorrow = date+1 < 10 ? '0'+date+1 : date+1
    render(
      <TestHelper>
        <Header />
      </TestHelper>
    );
    expect(screen.getByText(today, {exact: false}))
    userEvent.click(screen.getByTestId('right-arrow'));
    userEvent.click(screen.getByTestId('left-arrow'));
  });
});
