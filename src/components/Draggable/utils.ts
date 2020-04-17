import { map } from 'rxjs/operators';

import {
  DraggableStartOffsets,
  DraggableMoveResponse,
} from './types';

export const draggableStartsOfssets = (
  ev: MouseEvent,
): DraggableStartOffsets => {
  const { clientX, clientY } = ev;
  const target = ev.target as HTMLElement;

  const { left, top }: DOMRect = target.getBoundingClientRect();
  return {
    offsetX: clientX - left,
    offsetY: clientY - top,
  };
};

export const getElementLayers = (event: any) => {
  const { target, clientX, clientY } = event as MouseEvent;
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
  const {
    offsetWidth: parentWidth,
    offsetHeight: parentHeight,
  } = overlapEl;
  return map((props: DraggableMoveResponse) => {
    const { left, top, width, height } = props;
    const newPosition = { ...props };
    if (left < 0) {
      newPosition.left = 0;
    } else if (left > parentWidth - width) {
      newPosition.left = parentWidth - width;
    }

    if (top < 0) {
      newPosition.top = 0;
    } else if (top > parentHeight - height) {
      newPosition.top = parentHeight - height;
    }

    return { ...newPosition };
  });
};
