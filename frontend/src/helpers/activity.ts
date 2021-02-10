import API from './API';
import store from '../store';

export async function fetchActivities() {
  const temp = await API.get('activities');
  store.dispatch({ type: 'activity/setActivitiesState', payload: temp });
}
