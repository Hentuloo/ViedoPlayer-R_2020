export interface DraggableStartOffsets {
  offsetX: number;
  offsetY: number;
}

export interface DraggableMoveResponse {
  width: number;
  height: number;
  left: number;
  top: number;
}
export interface ClientXY {
  clientX: number;
  clientY: number;
}
export interface Target {
  target: HTMLElement;
}

export type DraggableEvent = MouseEvent &
  TouchEvent &
  ClientXY &
  Target;
