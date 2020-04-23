import { StoreType } from 'store';

export const getTimelinesAsArray = () => (store: StoreType) => {
  const keys = Object.keys(store.tools);
  return keys.map((key) => ({
    ...store.tools[key].time,
    id: key,
    data: store.tools[key].data,
  }));
};

export const getToolsAsArray = () => (store: StoreType) => {
  const keys = Object.keys(store.tools);
  return keys.map((key) => ({ ...store.tools[key], id: key }));
};
