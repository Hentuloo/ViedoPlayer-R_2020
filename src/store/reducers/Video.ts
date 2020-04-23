import { Action, types } from 'store/actions/types';

const initState = {
  url:
    'https://intro-video123.s3.eu-central-1.amazonaws.com/Best+No+Text+Intro+Template+Free+Download+%23105+(2).mp4',
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
