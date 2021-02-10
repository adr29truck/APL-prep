// import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './actionTypes';
import authReducer from './authReducer';
// import { CounterActionTypes } from './types';

describe('features > auth > authReducer', () => {
  it(`sets state, if auth/setState action is provided`, () => {
    const initialState = {
      id: 0,
      loading: true,
    };

    const expectedState = {
      id: 1,
      loading: false,
    };

    const action = {
      type: 'auth/setState',
      payload: { id: 1, loading: false },
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it(`Calls signout`, () => {
    const initialState = {
      id: 1,
      loading: false,
    };

    const expectedState = {
      id: 1,
      loading: false,
    };

    const action = {
      type: 'auth/signout',
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });
});
