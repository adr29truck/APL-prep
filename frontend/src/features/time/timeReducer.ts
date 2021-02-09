import { AuthActionTypes } from './types';
import { getDayAsString } from '../../helpers/time';
import { fetchTimes } from '../../helpers/times';

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
        temp.getFullYear() < temp2.getFullYear() ||
        (temp.getFullYear() === temp2.getFullYear() &&
          temp.getMonth() < temp2.getMonth()) ||
        (temp.getFullYear() === temp2.getFullYear() &&
          temp.getMonth() === temp2.getMonth() &&
          temp.getDate() <= temp2.getDate())
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
