import { combineReducers } from 'redux';
import toolsReducer, { ToolsState } from './Tools';
import videoReducer, { VideoState } from './Video';

export default combineReducers({
  video: videoReducer,
  tools: toolsReducer,
});
export interface StoreType {
  video: VideoState;
  tools: ToolsState;
}
