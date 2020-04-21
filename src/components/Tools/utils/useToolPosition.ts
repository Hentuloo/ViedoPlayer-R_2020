import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useToolPosition = <T extends {} = HTMLElement>(
  { left, top }: { left: number; top: number },
  parentRef: HTMLElement | null,
) => {
  const ref = useRef<T>(null);

  const updatePosition = () => {
    if (!ref.current || !parentRef) return;

    const { offsetWidth, offsetHeight } = parentRef;
    const x = (offsetWidth * left) / 100;
    const y = (offsetHeight * top) / 100;
    gsap.set(ref.current, {
      x,
      y,
    });
  };

  useEffect(() => {
    updatePosition();
  }, [left, top, ref.current]);

  useEffect(() => {
    if (!ref.current || !parentRef) return;
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [parentRef, left, top]);

  return ref;
};
