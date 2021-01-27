export interface AuthActionTypes {
  payload: any;
  type: string;
}

export interface SystemState {
  id: number;
  name: string;
  jwt: string;
}

export interface SystemStateO {
  auth: SystemState;
}
