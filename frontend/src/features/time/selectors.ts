import { Store } from '../types';
import { getDayAsString } from '../../helpers/time';

export const getTimes = (state: Store) => state.time.times;
export const getCurrentTime = (state: Store) =>
  getDayAsString(state.time.currentTime);
export const getCurrentTimeRaw = (state: Store) => state.time.currentTime;
export const getCheckedTimes = (state: Store) =>
  state.time.times.filter((x) => x.isChecked === true);
