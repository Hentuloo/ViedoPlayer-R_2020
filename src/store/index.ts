import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import RootReducer, { StoreType } from './reducers/root';

export default createStore(RootReducer, composeWithDevTools());
export type { StoreType };
