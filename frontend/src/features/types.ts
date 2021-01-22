import { SystemStateO } from './time/types';
import types from './activity/types';

export interface Store {
  count: object;
  auth: object;
  activity: types;
  time: SystemStateO;
}
