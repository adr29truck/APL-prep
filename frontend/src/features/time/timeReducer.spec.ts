import timeReducer from './timeReducer';

describe('features > counter > ActivityReducer', () => {
  it(`sets state, if time/setTimesState action is provided`, () => {
    const date = new Date('2021-01-27T11:01:58.135Z');
    const initialState = {
      times: [],
      currentTime: date,
    };

    const times = [
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
      {
        activity_id: null,
        color: null,
        id: 147,
        name: '2021-01-27T2',
        user_id: 1,
        label: '02',
        isChecked: false,
      },
    ];
    const expectedState = {
      times,
      currentTime: date,
    };

    const action = {
      type: 'time/setTimesState',
      payload: { times },
    };
    expect(timeReducer(initialState, action)).toEqual(expectedState);
  });
  it(`Checks a time by id, if time/checkBoxById action is provided`, () => {
    const date = new Date('2021-01-27T11:01:58.135Z');

    const times = [
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
      {
        activity_id: null,
        color: null,
        id: 147,
        name: '2021-01-27T2',
        user_id: 1,
        label: '02',
        isChecked: false,
      },
    ];

    const initialState = {
      times,
      currentTime: date,
    };

    times[0].isChecked = true;

    const expectedState = {
      times,
      currentTime: date,
    };

    const action = {
      type: 'time/checkBoxById',
      payload: 145,
    };
    expect(timeReducer(initialState, action)).toEqual(expectedState);
  });

  it(`Increases currentTime, if time/increaseTime action is provided`, () => {
    const temp = new Date('2021-01-27T11:01:58.135Z').valueOf() - 86_400_000;
    const date = new Date(temp);
    const initialState = {
      times: [],
      currentTime: date,
    };

    const date2 = new Date(date.valueOf() + 86_400_000);
    const expectedState = {
      times: [],
      currentTime: date2,
    };

    const action = {
      type: 'time/increaseTime',
    };

    expect(timeReducer(initialState, action)).toEqual(expectedState);
  });

  it(`Increases currentTime, if time/increaseTime action is provided, -120 days`, () => {
    const temp = new Date('2021-01-27T11:01:58.135Z').valueOf() - 86_400_000 * 120;
    const date = new Date(temp);
    const initialState = {
      times: [],
      currentTime: date,
    };

    const date2 = new Date(date.valueOf() + 86_400_000);
    const expectedState = {
      times: [],
      currentTime: date2,
    };

    const action = {
      type: 'time/increaseTime',
    };

    expect(timeReducer(initialState, action)).toEqual(expectedState);
  });

  it(`Don't increases currentTime, if time/increaseTime action is provided and increase is beyond today`, () => {
    const date = new Date('2021-01-27T11:01:58.135Z');
    const initialState = {
      times: [],
      currentTime: date,
    };

    const expectedState = {
      times: [],
      currentTime: date,
    };

    const action = {
      type: 'time/increaseTime',
    };

    expect(timeReducer(initialState, action)).toEqual(expectedState);
  });

  it(`Reduce currentTime, if time/reduceTime action is provided`, () => {
    const temp = new Date('2021-01-27T11:01:58.135Z').valueOf() - 86_400_000;
    const date = new Date(temp);
    const initialState = {
      times: [],
      currentTime: date,
    };

    const date2 = new Date(date.valueOf() - 86_400_000);
    const expectedState = {
      times: [],
      currentTime: date2,
    };

    const action = {
      type: 'time/reduceTime',
    };

    expect(timeReducer(initialState, action)).toEqual(expectedState);
  });

  it(`Reduce currentTime, if time/reduceTime action is provided, -120 days`, () => {
    const temp = new Date('2021-01-27T11:01:58.135Z').valueOf() - 86_400_000 * 120;
    const date = new Date(temp);
    const initialState = {
      times: [],
      currentTime: date,
    };

    const date2 = new Date(date.valueOf() - 86_400_000);
    const expectedState = {
      times: [],
      currentTime: date2,
    };

    const action = {
      type: 'time/reduceTime',
    };

    expect(timeReducer(initialState, action)).toEqual(expectedState);
  });
});
