import { Action, types } from 'store/actions/types';

const initState = {
  url:
    'https://megawrzuta.pl/files/68a91f1b4d4a97e2b5887fb9d057d768.mp4',
};
export interface VideoState {
  url: string;
}

export default (state = initState, action: Action): VideoState => {
  switch (action.type) {
    case types.CHANGE_VIDEO_URL: {
      return { ...state, url: action.payload };
    }
    default:
      return state;
  }
};
