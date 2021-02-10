import React from 'react';
import { mount } from 'enzyme';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom/extend-expect';
import DayButton from './DayButton';
import { TestHelper } from '../../helpers/testHelper';

describe('<DayButton />', () => {
  it('renders correctly', () => {
    let x = false;

    const wrapper = mount(
      <TestHelper>
        <DayButton
          object={{
            style: {},
            name: 'test',
            isChecked: false,
            id: 12,
            label: 'testlabel',
          }}
          onClickCheckBox={() => {
            x = !x;
          }}
        />
      </TestHelper>
    );

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('handles right click correctly', () => {
    const x = false;
    const func = jest.fn();
    render(
      <TestHelper>
        <DayButton
          object={{
            style: {},
            name: 'test',
            isChecked: x,
            id: 12,
            label: 'testlabel',
          }}
          onClickCheckBox={func}
        />
      </TestHelper>
    );

    expect(screen.getByText('testlabel', { exact: true }));
    userEvent.click(screen.getByText('testlabel'));
    expect(func).toHaveBeenCalledTimes(1);
  });
});
