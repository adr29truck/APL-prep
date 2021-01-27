interface XY {
  date?: string;
  name?: string;
  times?: any[];
}

export interface AuthActionTypes {
  payload?: any;
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
