import { useEffect, useRef, useCallback } from 'react';
import { Cords } from 'store/actions/types';

export const useToolPosition = <T extends HTMLElement = HTMLElement>(
  { left, top, width, height, rotation }: Cords,
  parentRef: HTMLElement | null,
) => {
  const ref = useRef<T>(null);

  const updateToolSize = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.width = `${width}%`;
    el.style.height = `${height}%`;
  }, [height, width]);

  const updateToolFontSize = useCallback(() => {
    const el = ref.current;
    if (!parentRef || !el) return;
    const relFontsize = parentRef.clientWidth * 0.03;
    el.style.fontSize = relFontsize + 'px';
  }, [parentRef]);

  const updatePosition = useCallback(() => {
    const el = ref.current;
    if (!el || !parentRef) return;

    const { offsetWidth, offsetHeight } = parentRef;
    const x = (offsetWidth * left) / 100;
    const y = ((offsetHeight + 10) * top) / 100;
    el.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
  }, [left, parentRef, rotation, top]);

  const onResize = useCallback(() => {
    updateToolSize();
    updateToolFontSize();
    updatePosition();
  }, [updatePosition, updateToolFontSize, updateToolSize]);

  useEffect(() => {
    if (!ref.current || !parentRef) return;

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [parentRef, left, top, updatePosition, onResize]);

  useEffect(() => {
    onResize();
  }, [left, top, ref, onResize]);

  useEffect(() => {
    updateToolSize();
  }, [updateToolSize]);

  return ref;
};
