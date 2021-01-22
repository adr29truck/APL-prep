interface XY {
  date: string;
  name: string;
  times: [];
}

export interface AuthActionTypes {
  payload: XY;
  type: string;
}

export interface SystemState {
  id: number;
  name: string;
  isChecked: boolean;
}

export interface SystemStateO {
  times: SystemState[];
  currentTime: Date;
}
