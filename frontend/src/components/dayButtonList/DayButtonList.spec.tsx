import React from 'react';
import { mount } from 'enzyme';

import '@testing-library/jest-dom/extend-expect';
import DayButtonList from './DayButtonList';
import { TestHelper } from '../../helpers/testHelper';
import store from '../../store';

describe('<DayButtonList />', () => {
  it('renders correctly', () => {
    store.dispatch({
      type: 'time/setTimesState',
      payload: {
        times: [
          {
            activity_id: null,
            color: null,
            id: 145,
            name: '2021-01-27T0',
            user_id: 1,
            label: '00',
            isChecked: false,
          },
          {
            activity_id: null,
            color: null,
            id: 146,
            name: '2021-01-27T1',
            user_id: 1,
            label: '01',
            isChecked: false,
          },
        ],
      },
    });

    const wrapper = mount(
      <TestHelper>
        <DayButtonList />
      </TestHelper>
    );

    expect(wrapper.html()).toMatchSnapshot();
  });
});
