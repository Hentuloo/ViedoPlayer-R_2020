export interface LabelInterface {
  id: number;
  cord: { left: number; top: number; width: number; height: number };
  content: string;
}

export interface LabelProps {
  label: LabelInterface;
}

export interface EditableLabelProps extends LabelProps {
  defaultEditMode?: boolean;
}
