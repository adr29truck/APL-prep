import API from './API';
import store from '../store';

export async function updateTimes(times: any, activity: any, day: string) {
  // eslint-disable-next-line no-restricted-syntax
  for (const time of times) {
    // eslint-disable-next-line no-await-in-loop
    await API.post(`times/${day}`, { id: time.id, activity_id: activity.id });
  }
  store.dispatch({ type: 'time/fetch' });
}
