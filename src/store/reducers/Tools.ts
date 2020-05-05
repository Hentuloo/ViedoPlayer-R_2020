import { types, Action, ToolsState } from 'store/actions/types';
import { toolsByTypes } from 'components/Toolkit/defaults';
import produce, { Draft } from 'immer';
import defaultState from './ToolsDefaultState';

export type { ToolsState };

export default produce(
  (draft: Draft<ToolsState> = defaultState, action: Action) => {
    switch (action.type) {
      case types.TOOL_LABEL_CHANGE_CONTENT: {
        const { id, content } = action.payload;
        draft[id].data.content = content;
        break;
      }

      case types.CHANGE_VIDEO_URL: {
        return {};
      }

      case types.TOOL_ADD: {
        const { type, x, y } = action.payload;
        const id = Object.keys(draft).length;

        const newTool = {
          ...toolsByTypes[type],
          cord: {
            ...toolsByTypes[type].cord,
            left: x,
            top: y,
          },
          data: {
            ...toolsByTypes[type].data,
            type,
          },
        };
        draft[id] = newTool;
        break;
      }

      case types.TOOL_CHANGE_CORDS: {
        const { id, x, y } = action.payload;
        draft[id].cord.left = x;
        draft[id].cord.top = y;
        break;
      }

      case types.TOOL_CHANGE_ROTATION: {
        const { id, rotation } = action.payload;
        draft[id].cord.rotation = rotation;
        break;
      }

      case types.TOOL_REMOVE: {
        const id = action.payload;
        delete draft[id];
        break;
      }

      case types.TOOL_CHANGE_SIZE: {
        const { id, cords: newCords } = action.payload;
        const currentCords = draft[id].cord;

        const cords = {
          ...currentCords,
          ...newCords,
        };
        draft[id].cord = cords;
        break;
      }

      case types.TOOL_CHANGE_TIME: {
        const { id, time } = action.payload;
        draft[id].time = { ...draft[id].time, ...time };
        break;
      }
      default:
        return draft;
    }
  },
);
