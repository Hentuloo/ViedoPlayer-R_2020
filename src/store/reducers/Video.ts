import { Action, types } from 'store/actions/types';
import produce, { Draft } from 'immer';

const initState = {
  url:
    'https://intro-video123.s3.eu-central-1.amazonaws.com/Best+No+Text+Intro+Template+Free+Download+%23105+(2).mp4',
};
export interface VideoState {
  url: string;
}

export default produce(
  (draft: Draft<VideoState> = initState, action: Action) => {
    switch (action.type) {
      case types.CHANGE_VIDEO_URL: {
        draft.url = action.payload;
        break;
      }
      default:
        return draft;
    }
  },
);
