import { map, filter, tap } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs';

export const getRectWithOffsets = (ev: React.MouseEvent) => {
  const { clientX, clientY } = ev;
  const target = ev.target as HTMLDivElement;
  const {
    left,
    top,
    width,
    height,
    ...rest
  }: DOMRect = target.getBoundingClientRect();
  return {
    offsetX: clientX - left,
    offsetY: clientY - top,
    width,
    height,
    ...rest,
  };
};

export const getLayers = (evt: React.MouseEvent) => {
  let el = evt.target as HTMLElement;
  let layers = { x: 0, y: 0 };

  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    layers = {
      x: layers.x + el.offsetLeft - el.scrollLeft,
      y: layers.y + el.offsetTop - el.scrollTop,
    };

    //@ts-ignore
    el = el.offsetParent;
  }
  layers = {
    x: evt.clientX - layers.x,
    y: evt.clientY - layers.y,
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
  overlapEl: HTMLElement,
): OperatorFunction<InnerElementCord, CordAfterOverlapMap> => {
  if (!overlapEl) return tap((e) => e);
  const {
    offsetWidth: parentWidth,
    offsetHeight: parentHeight,
  } = overlapEl;

  return map(
    (position: InnerElementCord): CordAfterOverlapMap => {
      const { left, top, width, height } = position;
      const newPosition = { ...position };
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

      return { ...newPosition, parentWidth, parentHeight };
    },
  );
};

export const detectOnlySourceNodeFilter = (
  flag: boolean,
  sourceNode: Node,
) => {
  return filter((ev: React.MouseEvent) => {
    if (flag) return ev.target === sourceNode;
    return true;
  });
};
