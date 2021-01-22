interface XY {
  id: number;
}

export interface AuthActionTypes {
  payload: XY;
  type: string;
}

export interface SystemState {
  id: number;
  name: string;
}

export interface SystemStateO {
  auth: SystemState;
}
