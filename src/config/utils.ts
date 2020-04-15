import React, { Ref } from 'react';

export interface MouseCord {
  clientX: number;
  clientY: number;
}

export const mouseIsOnElement = (
  { clientX, clientY }: MouseCord,
  element: HTMLElement,
) => {
  const {
    left,
    top,
    width,
    height,
  } = element.getBoundingClientRect();
  if (
    clientX > left &&
    clientX < left + width &&
    clientY > top &&
    clientY < top + height
  ) {
    return true;
  }
  return false;
};

export const mergeRefs = <T>(...refs: Array<Ref<T>>) => (ref: T) => {
  refs.forEach((resolvableRef) => {
    if (typeof resolvableRef === 'function') {
      resolvableRef(ref);
    } else {
      (resolvableRef as any).current = ref;
    }
  });
};

export const getCordsPrecentsInsideWrapper = (
  cords: { x: number; y: number },
  wrapper: React.RefObject<HTMLElement>,
) => {
  if (!wrapper.current) return;
  const { offsetWidth, offsetHeight } = wrapper.current;
  const x = (cords.x / offsetWidth) * 100;
  const y = (cords.y / offsetHeight) * 100;
  return { x, y };
};
