import { ToolsIntefaces } from 'components/Tools/Toolkit/types';
import { ToolActions } from './toolsActions';
import { ToolkinActions } from './toolkitAction';

// types and actions
export type Action = ToolActions | ToolkinActions;
export enum types {
  //General tool types
  TOOL_ADD,
  TOOL_CHANGE_CORDS,
  TOOL_CHANGE_SIZE,
  TOOL_CHANGE_TIME,
  TOOL_CHANGE_CONTENT,
  //Toolkit types
  TOOL_LABEL_CHANGE_CONTENT,
}

// Tool fields
export interface ToolCords {
  cord: { left: number; top: number; width: number; height: number };
}
export interface ToolTime {
  time: {
    from: number | null;
    to: number | null;
  };
}

export type ToolCordsAndTime = ToolCords & ToolTime;
export interface ToolInterface extends ToolCordsAndTime {
  data: ToolsIntefaces;
}
export interface ToolInterfaceWithId extends ToolInterface {
  id: IdType;
}

export type IdType = number | string;
export type ToolsState = {
  [key in IdType]: ToolInterface;
};
