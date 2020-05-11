import { ToolsIntefaces } from 'components/Toolkit/types';
import { ToolActions } from './toolsActions';
import { ToolkinActions } from './toolkitAction';
import { VideoActions } from './videoActions';

// types and actions
export type Action = ToolActions | ToolkinActions | VideoActions;
export enum types {
  //General tool types
  TOOL_ADD,
  TOOL_REMOVE,
  TOOL_CHANGE_CORDS,
  TOOL_CHANGE_SIZE,
  TOOL_CHANGE_TIME,
  TOOL_CHANGE_CONTENT,
  //Toolkit types
  TOOL_LABEL_CHANGE_CONTENT,
  //Video types
  CHANGE_VIDEO_URL,
  TOOL_CHANGE_ROTATION,
}

// Tool fields
export interface Cords {
  left: number;
  top: number;
  width: number;
  height: number;
  rotation: number;
}
export interface ToolCords {
  cord: Cords;
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
  lastIndex: number;
  items: {
    [key in IdType]: ToolInterface;
  };
};
