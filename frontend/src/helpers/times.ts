import API from './API';
import store from '../store';

export async function updateTimes(times: any, activity: any, day: string) {
  console.log('Submitted data, ish');
  // eslint-disable-next-line no-restricted-syntax
  for (const time of times) {
    // eslint-disable-next-line no-await-in-loop
    await API.post(`times/${day}`, { id: time.id, activity_id: activity.id });
  }
  store.dispatch({ type: 'time/fetch' });
  // const filteredTimes = times.filter((x) => x.isChecked === true);
  //   for (const t of filteredTimes) {
  //   }
  //   setSubmitted((q) => !q);
}
