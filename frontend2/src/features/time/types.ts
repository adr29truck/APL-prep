interface XY {
  date: string;
  name: string;
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
  activity: SystemState;
}
