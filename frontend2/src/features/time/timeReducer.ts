import { AuthActionTypes } from './types';
import API from '../../helpers/API';
import store from '../../store';

// TODO: Extract me to a module
async function fetchTimes(date: string) {
  const temp = await API.get(`times/${date}`);
  store.dispatch({ type: 'time/setState', payload: temp });
}

const initialState: object[] = [];

export default (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case 'time/fetch': {
      fetchTimes(action.payload.date);
      return state;
    }
    case 'time/setState': {
      return action.payload;
    }
    default:
      return state;
  }
};
