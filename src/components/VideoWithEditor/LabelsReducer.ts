import { defaultLabel } from './ToolBar/config';

import {
  LabelInterface,
  LabelNewCords,
} from 'components/LabelsPanel/types';

export enum actionTypes {
  ADD,
  CHANGE_CORDS,
}

type State = LabelInterface[];
interface AddLabelAction {
  type: actionTypes.ADD;
  payload: { x: number; y: number };
}

interface ChangeCordsPayloadWithId extends LabelNewCords {
  id: number;
}

interface ChangeCordsLabelAction {
  type: actionTypes.CHANGE_CORDS;
  payload: ChangeCordsPayloadWithId;
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
    const copyOfArray = state.slice();
    return copyOfArray.map((label) => {
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
