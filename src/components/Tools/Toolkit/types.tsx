import { ToolInterfaceWithId } from 'store/actions/types';

export enum ToolsNames {
  LABEL,
}
export type LABEL = ToolsNames.LABEL;
export type ToolsIntefaces = Label;

//Tool
export interface Label {
  type: ToolsNames.LABEL;
  content: string;
}
export interface LabelComponent extends ToolInterfaceWithId {
  data: Label;
}

export interface LabelStatic extends ToolStatic {
  tool: LabelComponent;
}
export interface LabelEditable extends ToolkitEditable {
  tool: LabelComponent;
}

// every toolkit have this props
interface ToolComponent {
  parentRef: React.RefObject<HTMLDivElement>;
}
interface ToolStatic extends ToolComponent {}

interface ToolkitEditable extends ToolComponent {
  editMode: boolean;
  changeEditMode: (flag: boolean) => void;
}
