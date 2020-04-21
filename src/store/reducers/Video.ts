import { Action } from 'store/actions/types';

const initState = {
  url: 'http://techslides.com/demos/sample-videos/small.mp4',
};
export interface VideoState {
  url: string;
}

export default (state = initState, action: Action): VideoState => {
  switch (action.type) {
    default:
      return state;
  }
};
