interface XY {
  id: number;
  name: string;
}

export interface AuthActionTypes {
  payload: [XY];
  type: string;
}

export interface SystemState {
  id: number;
  name: string;
}

export default interface SystemStateO {
  activities: SystemState[];
  currentActivity: XY;
}
