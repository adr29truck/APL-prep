import { SystemStateO } from './types';

export const getUser = (state: SystemStateO) => state.auth;
export const getJWT = (state: SystemStateO) => state.auth.jwt;
