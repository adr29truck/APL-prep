import { SystemStateO } from './time/types';
import { SystemState as AuthI } from './auth/types';
import types from './activity/types';

export interface Store {
  count: object;
  auth: AuthI;
  activity: types;
  time: SystemStateO;
}
