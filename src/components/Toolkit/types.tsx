import { ToolInterfaceWithId } from 'store/actions/types';

export enum ToolsNames {
  LABEL,
  LINK,
}
export type LABEL = ToolsNames.LABEL;
export type LINK = ToolsNames.LINK;
export type ToolsIntefaces = Label | Link;

export interface Tool<D extends ToolsIntefaces>
  extends ToolInterfaceWithId {
  data: D;
}

// every toolkit have this props
interface ToolStatic<D extends ToolsIntefaces> {
  parentRef: React.RefObject<HTMLDivElement>;
  tool: Tool<D>;
}
interface ToolkitEditable<D extends ToolsIntefaces> {
  parentRef: React.RefObject<HTMLDivElement>;
  editMode?: boolean;
  changeEditMode?: (flag: boolean) => void;
  tool: Tool<D>;
}

//Label
export interface Label {
  type: ToolsNames.LABEL;
  content: string;
}
export type LabelStatic = ToolStatic<Label>;
export type LabelEditable = ToolkitEditable<Label>;

//Link
export interface Link {
  type: ToolsNames.LINK;
  content: string;
  url: string;
}
export type LinkStatic = ToolStatic<Link>;
export type LinkEditable = ToolkitEditable<Link>;
