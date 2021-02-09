import store from '../store';
import API from './API';

/**
 * Extracts the content from a JWT token
 * @param {*} token - x
 * @return {Object} - data
 */
export function parseJwt(token: string) {
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

export async function signIn(payload: object) {
  const temp = await API.post('api/login', payload);
  store.dispatch({ type: 'auth/setState', payload: temp });
}

export async function signOut() {
  await API.post('api/logout');
  store.dispatch({ type: 'auth/setState', payload: { id: 0 } });
}
