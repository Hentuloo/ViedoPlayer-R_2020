import { defaultLabel } from './config';

import {
  LabelInterface,
  ChangeCordsPayload,
} from 'components/LabelsPanel/Labels/types';

export enum actionTypes {
  ADD,
  CHANGE_CORDS,
}

type State = LabelInterface[];
interface AddLabelAction {
  type: actionTypes.ADD;
  payload: { x: number; y: number };
}

interface ChangeCordsLabelAction {
  type: actionTypes.CHANGE_CORDS;
  payload: ChangeCordsPayload;
}

type Action = AddLabelAction | ChangeCordsLabelAction;

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
    return state.map((label) => {
      if (label.id !== action.payload.id) return label;
      return {
        ...label,
        cord: {
          ...label.cord,
          left: action.payload.x,
          top: action.payload.y,
        },
      };
    });
  }
  return state;
};
export default reducer;
