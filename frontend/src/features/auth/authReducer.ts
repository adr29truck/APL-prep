import { AuthActionTypes } from './types';
import API from '../../helpers/API';
import store from '../../store';

// TODO: Extract me to a module
/**
 * Extracts the content from a JWT token
 * @param {*} token - x
 * @return {Object} - data
 */
function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join('')
  );
  return JSON.parse(jsonPayload);
}

// TODO: Extract me to a module
async function signIn(payload: object) {
  const token = await API.post('api/login', payload);
  localStorage.removeItem('jwt');
  localStorage.setItem('jwt', token.access_token);
  const temp = parseJwt(token.access_token);
  store.dispatch({ type: 'auth/setJWT', payload: token.access_token });
  store.dispatch({ type: 'auth/setState', payload: temp });
}

const initialState = {
  id: 0,
  loading: false,
  jwt: '',
};

export default (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case 'auth/signIn': {
      signIn(action.payload);
      return { ...state, loading: true };
    }
    case 'auth/signOut': {
      return { ...state, id: 0 };
    }
    case 'auth/setJWT': {
      return { ...state, jwt: action.payload };
    }
    case 'auth/setState': {
      return {
        ...state,
        id: action.payload.id as number,
        loading: false,
      };
    }
    default:
      return state;
  }
};
