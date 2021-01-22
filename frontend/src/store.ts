import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { AuthReducer } from './features/auth';
import { ActivityReducer } from './features/activity';
import { TimeReducer } from './features/time';

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  auth: AuthReducer,
  activity: ActivityReducer,
  time: TimeReducer,
});

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(rootReducer, /* initialState, */ composedEnhancer);

export default store;
