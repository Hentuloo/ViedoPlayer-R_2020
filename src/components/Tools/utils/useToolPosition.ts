import { useEffect, useRef, useCallback } from 'react';
import { Cords } from 'store/actions/types';

export const useToolPosition = <T extends HTMLElement = HTMLElement>(
  { left, top, width, height, rotation }: Cords,
  parentRef: HTMLElement | null,
) => {
  const ref = useRef<T>(null);

  const updateSize = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.width = `${width}%`;
    el.style.height = `${height}%`;
  }, [height, width]);

  const updatePosition = useCallback(() => {
    const el = ref.current;
    if (!el || !parentRef) return;

    const { offsetWidth, offsetHeight } = parentRef;
    const x = (offsetWidth * left) / 100;
    const y = (offsetHeight * top) / 100;
    el.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
  }, [left, top, rotation, parentRef]);

  useEffect(() => {
    updatePosition();
  }, [left, top, ref, updatePosition]);

  useEffect(() => {
    if (!ref.current || !parentRef) return;
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [parentRef, left, top, updatePosition]);

  useEffect(() => {
    updateSize();
  }, [updateSize]);

  return ref;
};
