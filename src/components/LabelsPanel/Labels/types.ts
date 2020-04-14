export interface LabelCords {
  cord: { left: number; top: number; width: number; height: number };
}
export interface LabelContent {
  content: string;
}
export interface NewLabelInterface extends LabelCords, LabelContent {}
export interface LabelInterface extends NewLabelInterface {
  id: number;
}

export interface ChangeCordsPayload {
  id: number;
  x: number;
  y: number;
}

export interface LabelsEvents {
  changeCord: (cords: ChangeCordsPayload) => void;
}

export interface LabelProps {
  label: LabelInterface;
}

export interface EditableLabelProps extends LabelProps {
  events: LabelsEvents;
}
