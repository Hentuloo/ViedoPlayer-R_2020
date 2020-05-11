import { MoveableOptions, MoveableInterface } from 'moveable';

export type MoveableTarget = HTMLElement | SVGElement;
export interface MoveableProps extends MoveableOptions {
  parent?: any;
  showLines?: boolean;
  overlapElement?: MoveableTarget;
}

export type { MoveableOptions, MoveableInterface };
