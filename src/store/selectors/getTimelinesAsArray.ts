import { StoreType } from 'store';

export const getTimelinesAsArray = () => (store: StoreType) => {
  const keys = Object.keys(store.tools);
  return keys.map((key) => ({ ...store.tools[key].time, id: key }));
};
