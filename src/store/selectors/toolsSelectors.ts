import { StoreType } from 'store';

export const getTimelinesAsArray = () => (store: StoreType) => {
  const { items } = store.tools;
  const keys = Object.keys(items);
  return keys.map((key) => ({
    ...items[key].time,
    id: key,
    data: items[key].data,
  }));
};

export const getToolsAsArray = () => (store: StoreType) => {
  const { items } = store.tools;
  const keys = Object.keys(items);
  return keys.map((key) => ({ ...items[key], id: key }));
};
