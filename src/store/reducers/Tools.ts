import { types, Action, ToolsState } from 'store/actions/types';
import { toolsByTypes } from 'components/Tools/Toolkit/defaults';

export type { ToolsState };

const initState = {
  '0': {
    cord: {
      left: 19.721794871794874,
      top: 19.609638554216865,
      width: 18.72,
      height: 16.39,
    },
    time: {
      from: 3.56,
      to: 8.19,
    },
    data: {
      type: 0,
      content: 'Some sample video',
    },
  },
  '1': {
    cord: {
      left: 0,
      top: 0,
      width: 12.82,
      height: 12.53,
    },
    time: {
      from: 0,
      to: 3.51,
    },
    data: {
      type: 0,
      content: 'Hello!',
    },
  },
  '2': {
    cord: {
      left: 71.53999999999999,
      top: 74.46000000000001,
      width: 28.46,
      height: 25.54,
    },
    time: {
      from: 8.2,
      to: 13.98,
    },
    data: {
      type: 0,
      content: 'change page by navigation buttons',
    },
  },
};

export default (
  state: ToolsState = initState,
  action: Action,
): ToolsState => {
  switch (action.type) {
    case types.TOOL_LABEL_CHANGE_CONTENT: {
      const { id, content } = action.payload;
      const copy = { ...state };
      copy[id].data.content = content;
      return copy;
    }

    case types.CHANGE_VIDEO_URL: {
      return {};
    }

    case types.TOOL_ADD: {
      const { type, x, y } = action.payload;
      const id = Object.keys(state).length;
      return {
        ...state,
        [id]: {
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
        },
      };
    }

    case types.TOOL_CHANGE_CORDS: {
      const { id, x, y } = action.payload;

      return {
        ...state,
        [id]: {
          ...state[id],
          cord: {
            ...state[id].cord,
            left: x,
            top: y,
          },
        },
      };
    }

    case types.TOOL_REMOVE: {
      const id = action.payload;
      const newState = { ...state };
      delete newState[id];
      return newState;
    }

    case types.TOOL_CHANGE_SIZE: {
      const { id, width, height } = action.payload;
      const currentCords = state[id].cord;

      //prevent when element is out of parent (after resize)
      const left =
        currentCords.left + width > 100
          ? 100 - width
          : currentCords.left;
      const top =
        currentCords.top + height > 100
          ? 100 - height
          : currentCords.top;

      return {
        ...state,
        [id]: {
          ...state[id],
          cord: {
            left,
            top,
            width,
            height,
          },
        },
      };
    }

    case types.TOOL_CHANGE_TIME: {
      const { id, time } = action.payload;

      return {
        ...state,
        [id]: {
          ...state[id],
          time: { ...state[id].time, ...time },
        },
      };
    }

    default:
      return state;
  }
};
