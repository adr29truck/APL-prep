import { AuthActionTypes } from './types';
import API from '../../helpers/API';
import store from '../../store';

async function fetchActivities() {
  const temp = await API.get('activities');
  store.dispatch({ type: 'activity/setActivitiesState', payload: temp });
}

const initialState = {
  activities: [{ id: 0, name: '-' }],
  currentActivity: { id: 0, name: '-' },
};

export default (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case 'activity/fetch': {
      fetchActivities();
      return state;
    }
    case 'activity/setCurrentActivity': {
      return { ...state, currentActivity: action.payload };
    }
    case 'activity/setActivitiesState': {
      return {
        ...state,
        activities: [...state.activities, ...action.payload],
      };
    }
    default:
      return state;
  }
};
