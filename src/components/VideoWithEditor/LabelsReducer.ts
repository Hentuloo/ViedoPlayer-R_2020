import { defaultLabel } from './config';
import { LabelInterface } from 'components/LabelsPanel/types';

export enum actionTypes {
  ADD,
  CHANGE_CORDS,
  CHANGE_SIZE,
  CHANGE_CONTENT,
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
interface ChangeContentLabelAction {
  type: actionTypes.CHANGE_CONTENT;
  payload: { id: number; content: string };
}

type Action =
  | AddLabelAction
  | ChangeCordsLabelAction
  | ChangeSizeAction
  | ChangeContentLabelAction;

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
      const { width, height } = label.cord;
      const { x, y } = action.payload;

      //prevent when element is out of parent (after resize)
      const newX = x + width >= 100 ? 100 - width : x;
      const newY = y + height >= 100 ? 100 - height - y : y;

      return {
        ...label,
        cord: {
          ...label.cord,
          left: newX,
          top: newY,
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
  if (action.type === actionTypes.CHANGE_CONTENT) {
    const copyOfArray = state.slice();
    return copyOfArray.map((label) => {
      if (label.id !== action.payload.id) return label;
      return {
        ...label,
        content: action.payload.content,
      };
    });
  }
  return state;
};
export default reducer;
