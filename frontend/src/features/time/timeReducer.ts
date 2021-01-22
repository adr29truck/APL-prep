import { AuthActionTypes } from './types';
import API from '../../helpers/API';
import { getDayAsString } from '../../helpers/time';
import store from '../../store';

// TODO: Extract me to a module
async function fetchTimes(date: string) {
  const temp: any[] = await API.get(`times/${date}`);
  // eslint-disable-next-line no-restricted-syntax
  for (const x of temp) {
    // eslint-disable-next-line prefer-destructuring
    x.label = x.name.split('T')[1];
    x.label = x.label.length === 1 ? `0${x.label}` : x.label;
    x.isChecked = false;
    if (x.color != null) {
      x.style = { color: x.color };
    }
  }
  store.dispatch({ type: 'time/setTimesState', payload: { times: temp } });
}

const initialState = { times: <any[]>[], currentTime: new Date() };

export default (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case 'time/fetch': {
      fetchTimes(getDayAsString(state.currentTime));
      return state;
    }
    case 'time/increaseTime': {
      const temp = new Date(state.currentTime.valueOf() + 86_400_000);
      const temp2 = new Date();
      if (
        !(
          temp.getFullYear() === temp2.getFullYear() &&
          temp.getDate() === temp2.getDate() &&
          temp.getMonth() === temp2.getMonth()
        )
      ) {
        return {
          ...state,
          currentTime: new Date(state.currentTime.valueOf() + 86_400_000),
        };
      }
      return state;
    }
    case 'time/checkBoxById': {
      const temp = state.times.find((x) => x.id === action.payload);
      temp.isChecked = !temp.isChecked;

      const newArr = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const x of state.times) {
        if (x.id === temp.id) {
          newArr.push({ ...temp });
        } else {
          newArr.push(x);
        }
      }
      return {
        ...state,
        times: newArr,
      };
    }
    case 'time/reduceTime': {
      return {
        ...state,
        currentTime: new Date(state.currentTime.valueOf() - 86_400_000),
      };
    }
    case 'time/setTimesState': {
      return { ...state, times: [...action.payload.times] };
    }
    default:
      return state;
  }
};
