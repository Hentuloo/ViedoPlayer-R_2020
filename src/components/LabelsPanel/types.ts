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

export interface LabelNewCords {
  x: number;
  y: number;
}

export interface LabelsEvents {
  changeCord: (id: number, cords: LabelNewCords) => void;
  changeLabelSize: (
    id: number,
    width: number,
    height: number,
  ) => void;
}

export interface LabelElementProps {
  label: LabelInterface;
  parentRef: React.RefObject<HTMLElement>;
}

export interface EditabLabelElementProps extends LabelElementProps {
  events: LabelsEvents;
}
