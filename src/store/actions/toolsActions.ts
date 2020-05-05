import { ToolsNames } from 'components/Toolkit/types';
import { IdType, types } from './types';

export type ToolActions =
  | AddToolAction
  | ChangeCordsToolAction
  | ChangeSizeAction
  | ChangeTimeAction
  | RemoveToolAction
  | ChangeRotationToolAction;

interface ChangeRotationToolAction {
  type: types.TOOL_CHANGE_ROTATION;
  payload: { id: IdType; rotation: number };
}
export const changeToolRotation = (
  id: IdType,
  rotation: number,
): ChangeRotationToolAction => ({
  type: types.TOOL_CHANGE_ROTATION,
  payload: { id, rotation },
});

interface AddToolAction {
  type: types.TOOL_ADD;
  payload: { type: ToolsNames; x: number; y: number };
}
export const addTool = (
  type: ToolsNames,
  x: number,
  y: number,
): AddToolAction => ({
  type: types.TOOL_ADD,
  payload: { type, x, y },
});

interface RemoveToolAction {
  type: types.TOOL_REMOVE;
  payload: IdType;
}
export const removeTool = (id: IdType): RemoveToolAction => ({
  type: types.TOOL_REMOVE,
  payload: id,
});

interface ChangeCordsToolAction {
  type: types.TOOL_CHANGE_CORDS;
  payload: { id: IdType; x: number; y: number };
}
export const changeToolCord = (
  id: IdType,
  precents: { x: number; y: number },
): ChangeCordsToolAction => ({
  type: types.TOOL_CHANGE_CORDS,
  payload: { id, ...precents },
});

interface ChangeCordsPrpos {
  width: number;
  height: number;
  left: number;
  top: number;
}
interface ChangeSizeAction {
  type: types.TOOL_CHANGE_SIZE;
  payload: {
    id: IdType;
    cords: ChangeCordsPrpos;
  };
}
export const changeToolSize = (
  id: IdType,
  cords: ChangeCordsPrpos,
): ChangeSizeAction => ({
  type: types.TOOL_CHANGE_SIZE,
  payload: { id, cords },
});

interface ChangeTimeAction {
  type: types.TOOL_CHANGE_TIME;
  payload: {
    id: IdType;
    time: {
      from?: number;
      to?: number;
    };
  };
}
export const changeToolTime = (
  id: IdType,
  time: {
    from?: number;
    to?: number;
  },
): ChangeTimeAction => ({
  type: types.TOOL_CHANGE_TIME,
  payload: { time, id },
});
