import { StoreType } from 'store';

export const getToolsAsArray = () => (store: StoreType) => {
  const keys = Object.keys(store.tools);
  return keys.map((key) => ({ ...store.tools[key], id: key }));
};
