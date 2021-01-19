import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from '../helpers/API';

import {createSelector} from 'reselect';

export const signIn = createAsyncThunk('auth/signIn', async (payload) => {
  const token = await API.post('api/login', payload);
  window.localStorage.setItem('jwt', token['access_token']);
  return parseJwt(token['access_token']);
});


/**
 * Thingy
 * @param {*} token - x
 * @return {Object} - data
 */
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};


// eslint-disable-next-line require-jsdoc
function authReducers(state = {}, action) {
  switch (action.type) {
    case 'INCREMEN T':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {id: null, name: '', username: ''},
  extraReducers: {
    [signIn.fulfilled]: (state, action) => {
      // ...action,
      return {
        ...state,
        id: action.payload['id'],
        loading: false,
      };
    },
    [signIn.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
  },
});

export default AuthSlice.reducer;
