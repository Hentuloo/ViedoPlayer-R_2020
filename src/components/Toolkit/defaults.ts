import { ToolsNames } from './types';

type ToolsByTypes = {
  [key: number]: any;
};
export const toolsByTypes: ToolsByTypes = {
  [ToolsNames.LABEL]: {
    cord: {
      width: 25,
      height: 20,
      left: 0,
      top: 0,
    },
    time: {
      from: null,
      to: null,
    },
    data: {
      type: ToolsNames.LABEL,
      content: 'Your label, type something here!',
    },
  },
  [ToolsNames.LINK]: {
    cord: {
      width: 18,
      height: 13,
      left: 0,
      top: 0,
    },
    time: {
      from: null,
      to: null,
    },
    data: {
      type: ToolsNames.LABEL,
      content: 'Your link',
      url: 'https://stoic-engelbart-eb60f0.netlify.app',
    },
  },
};
