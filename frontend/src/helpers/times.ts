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

export async function fetchTimes(date: string) {
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
