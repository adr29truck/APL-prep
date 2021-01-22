// import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './actionTypes';
import authReducer from './authReducer';
// import { CounterActionTypes } from './types';

describe('features > counter > counterReducer', () => {
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

  // it(`increments value, if ${DECREMENT_COUNTER} action is provided`, () => {
  //   const initialState = {
  //     value: 0,
  //   };

  //   const expectedState = {
  //     value: -1,
  //   };

  //   const action: CounterActionTypes = {
  //     type: DECREMENT_COUNTER,
  //   };

  //   expect(counterReducer(initialState, action)).toEqual(expectedState);
  // });
});
