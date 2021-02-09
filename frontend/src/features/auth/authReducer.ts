import { AuthActionTypes } from './types';
import { signIn } from '../../helpers/auth';

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
