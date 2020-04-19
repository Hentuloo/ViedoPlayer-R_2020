export interface NewTimeI {
  from?: number;
  to?: number;
}

export type OnChangeCursorTime = (time: NewTimeI) => void;
export type OnChangeCursorTimeWithId = (
  id: number,
  time: NewTimeI,
) => void;
