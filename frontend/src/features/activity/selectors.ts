import { Store } from '../types';

export const getActivities = (state: Store) => state.activity.activities;
export const getCurrentActivity = (state: Store) =>
  state.activity.currentActivity;
