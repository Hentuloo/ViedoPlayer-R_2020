import { defaultLabel } from './config';
import { LabelInterface } from 'components/LabelsPanel/types';

export enum actionTypes {
  ADD,
  CHANGE_CORDS,
  CHANGE_SIZE,
}

interface ChangeSizeAction {
  type: actionTypes.CHANGE_SIZE;
  payload: { id: number; width: number; height: number };
}

interface AddLabelAction {
  type: actionTypes.ADD;
  payload: { x: number; y: number };
}

interface ChangeCordsLabelAction {
  type: actionTypes.CHANGE_CORDS;
  payload: { id: number; x: number; y: number };
}

type Action =
  | AddLabelAction
  | ChangeCordsLabelAction
  | ChangeSizeAction;
type State = LabelInterface[];
const reducer = (state: State, action: Action) => {
  if (action.type === actionTypes.ADD) {
    const { x, y } = action.payload;
    return [
      ...state,
      {
        ...defaultLabel,
        cord: {
          ...defaultLabel.cord,
          left: x,
          top: y,
        },
        id: state.length,
      },
    ];
  }
  if (action.type === actionTypes.CHANGE_CORDS) {
    const copyOfArray = state.slice();
    return copyOfArray.map((label) => {
      if (label.id !== action.payload.id) return label;
      const { x, y } = action.payload;
      return {
        ...label,
        cord: {
          ...label.cord,
          left: x,
          top: y,
        },
      };
    });
  }
  if (action.type === actionTypes.CHANGE_SIZE) {
    const copyOfArray = state.slice();
    return copyOfArray.map((label) => {
      if (label.id !== action.payload.id) return label;
      const { width, height } = action.payload;
      return {
        ...label,
        cord: {
          ...label.cord,
          width,
          height,
        },
      };
    });
  }
  return state;
};
export default reducer;
