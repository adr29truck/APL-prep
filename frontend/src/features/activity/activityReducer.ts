import API from '../../helpers/API';
import store from '../../store';

async function fetchActivities() {
  const temp = await API.get('activities');
  store.dispatch({ type: 'activity/setActivitiesState', payload: temp });
}

const initialState = {
  activities: [{ id: -1, name: '-' }],
  currentActivity: { id: 0, name: '-' },
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case 'activity/fetch': {
      fetchActivities();
      return state;
    }
    case 'activity/setCurrentActivity': {
      return { ...state, currentActivity: action.payload };
    }
    case 'activity/setCurrentActivityById': {
      const current = state.activities.find(
        // eslint-disable-next-line radix
        (x) => x.id === parseInt(action.payload)
      );
      return { ...state, currentActivity: current };
    }
    case 'activity/setActivitiesState': {
      return {
        ...state,
        activities: [...action.payload],
      };
    }
    default:
      return state;
  }
};
