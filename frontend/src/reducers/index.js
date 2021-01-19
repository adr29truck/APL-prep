import {combineReducers} from 'redux';
// import visibilityFilter from './visibilityFilter';
import auth from './authSlice';

export default combineReducers({todos, auth});
