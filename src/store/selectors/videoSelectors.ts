import { StoreType } from 'store';

export const getVideoUrl = () => (store: StoreType) =>
  store.video.url;
