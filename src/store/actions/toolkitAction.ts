import { IdType, types } from './types';

export type ToolkinActions = ChangeLabelContentAction;

interface ChangeLabelContentAction {
  type: types.TOOL_LABEL_CHANGE_CONTENT;
  payload: {
    id: IdType;
    content: string;
  };
}
export const changeLabelToolContent = (
  id: IdType,
  content: string,
): ChangeLabelContentAction => ({
  type: types.TOOL_LABEL_CHANGE_CONTENT,
  payload: { content, id },
});
