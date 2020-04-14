import { map, tap } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs';
import gsap from 'gsap';

export const resetSourcePosition = (el: HTMLElement) => {
  const tl = gsap.timeline();
  tl.to(el, { duration: 0.2, opacity: 0, scale: 0.7 })
    .set(el, { x: 0, y: 0 })
    .to(el, { duration: 0.2, opacity: 1, scale: 1 });
};

export interface OffsetFromMouseEventRespnse {
  offsetX: number;
  offsetY: number;
}
export const offsetsFromMouseEvent = (
  ev: React.MouseEvent,
): OffsetFromMouseEventRespnse => {
  const { clientX, clientY } = ev;
  const target = ev.target as HTMLDivElement;

  const { left, top }: DOMRect = target.getBoundingClientRect();
  return {
    offsetX: clientX - left,
    offsetY: clientY - top,
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
  overlapEl?: HTMLElement,
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
export const getComputedTranslateXY = (obj: HTMLElement) => {
  const cord = { x: 0, y: 0 };
  const style = getComputedStyle(obj);
  const transform = style.transform || style.webkitTransform;

  let mat = transform.match(/^matrix3d\((.+)\)$/);

  mat = transform.match(/^matrix\((.+)\)$/);
  if (mat) {
    cord.x = parseFloat(mat[1].split(', ')[4]);
    cord.y = parseFloat(mat[1].split(', ')[5]);
  }

  return { ...cord };
};
