import activityReducer from './activityReducer';

describe('features > activity > activityReducer', () => {
  it(`sets currentActivity based on id`, () => {
    const initialState = {
      activities: [{ id: -1, name: '-' }],
      currentActivity: { id: 0, name: '-' },
    };

    const expectedState = {
      activities: [{ id: -1, name: '-' }],
      currentActivity: { id: -1, name: '-' },
    };

    const action = {
      type: 'activity/setCurrentActivityById',
      payload: -1,
    };

    expect(activityReducer(initialState, action)).toEqual(expectedState);
  });
  it(`sets currentActivity`, () => {
    const initialState = {
      activities: [{ id: -1, name: '-' }],
      currentActivity: { id: 0, name: '-' },
    };

    const expectedState = {
      activities: [{ id: -1, name: '-' }],
      currentActivity: { id: -3, name: 'x' },
    };

    const action = {
      type: 'activity/setCurrentActivity',
      payload: { id: -3, name: 'x' },
    };

    expect(activityReducer(initialState, action)).toEqual(expectedState);
  });

  it(`sets activity state`, () => {
    const initialState = {
      activities: [{ id: -1, name: '-' }],
      currentActivity: { id: 0, name: '-' },
    };

    const expectedState = {
      activities: [{ id: -4, name: 'pp' }],
      currentActivity: { id: 0, name: '-' },
    };

    const action = {
      type: 'activity/setActivitiesState',
      payload: [{ id: -4, name: 'pp' }],
    };

    expect(activityReducer(initialState, action)).toEqual(expectedState);
  });

  it(`fetches activities`, () => {
    const initialState = {
      activities: [{ id: -1, name: '-' }],
      currentActivity: { id: 0, name: '-' },
    };

    const expectedState = {
      activities: [{ id: -1, name: '-' }],
      currentActivity: { id: 0, name: '-' },
    };

    const action = {
      type: 'activity/fetch',
    };

    expect(activityReducer(initialState, action)).toEqual(expectedState);
  });
});
