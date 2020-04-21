import { types, Action, ToolsState } from 'store/actions/types';
import { toolsByTypes } from 'components/Tools/Toolkit/defaults';

export type { ToolsState };

const initState = {
  '0': {
    cord: {
      width: 12.18,
      height: 12.54,
      left: 8.82378223495702,
      top: 11.857938718662952,
    },
    time: {
      from: null,
      to: null,
    },
    data: {
      type: 0,
      content: 'Hello!',
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

    case types.TOOL_CHANGE_SIZE: {
      const { id, width, height } = action.payload;

      return {
        ...state,
        [id]: {
          ...state[id],
          cord: {
            ...state[id].cord,
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
