import { map } from 'rxjs/operators';

import {
  DraggableStartOffsets,
  DraggableMoveResponse,
} from './types';

export const draggableStartsOfssets = (
  event: any,
): DraggableStartOffsets => {
  const { clientX, clientY } = event;
  const target = event.target as HTMLElement;

  const { left, top }: DOMRect = target.getBoundingClientRect();
  return {
    offsetX: clientX - left,
    offsetY: clientY - top,
  };
};

export const getElementLayers = (ev: any) => {
  const event = ev.clientX ? ev : ev.touches[0];
  const { clientX, clientY, target } = event as MouseEvent;

  let el = target as HTMLElement;
  const { scrollTop, scrollLeft } = document.documentElement;
  let layers = { x: -scrollLeft, y: -scrollTop };

  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    layers = {
      x: layers.x + el.offsetLeft - el.scrollLeft,
      y: layers.y + el.offsetTop - el.scrollTop,
    };

    //@ts-ignore
    el = el.offsetParent;
  }
  layers = {
    x: clientX - layers.x,
    y: clientY - layers.y,
  };

  return layers;
};
export interface InnerElementCord {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface CordAfterOverlapMap extends InnerElementCord {
  parentWidth?: number;
  parentHeight?: number;
}

export const preventElementGoingOutParent = (
  overlapEl?: HTMLElement,
) => {
  if (!overlapEl) return map((props: DraggableMoveResponse) => props);

  return map((props: DraggableMoveResponse) => {
    const { offsetWidth, offsetHeight } = overlapEl;
    const { left, top, width, height } = props;
    const newPosition = { ...props };
    if (left < 0) {
      newPosition.left = 0;
    } else if (left > offsetWidth - width) {
      newPosition.left = offsetWidth - width;
    }

    if (top < 0) {
      newPosition.top = 0;
    } else if (top > offsetHeight - height) {
      newPosition.top = offsetHeight - height;
    }

    return { ...newPosition };
  });
};
