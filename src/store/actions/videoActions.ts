import { types } from './types';

export type VideoActions = VideoChangeUrlAction;

interface VideoChangeUrlAction {
  type: types.CHANGE_VIDEO_URL;
  payload: string;
}
export const changeVideoUrl = (url: string) => ({
  type: types.CHANGE_VIDEO_URL,
  payload: url,
});
