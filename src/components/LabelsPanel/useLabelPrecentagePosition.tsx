import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export interface LabelPositionCord {
  left: number;
  top: number;
}

export const useLabelPrecentagePosition = <
  T extends {} = HTMLElement
>(
  { left, top }: LabelPositionCord,
  parentRef: HTMLElement | null,
) => {
  const cords = useRef({ left, top });
  const ref = useRef<T>(null);

  useEffect(() => {
    cords.current = {
      left,
      top,
    };
  }, [left, top]);

  useEffect(() => {
    if (!ref.current || !parentRef) return;

    const updatePosition = () => {
      if (!ref.current || !parentRef) return;
      const { offsetWidth, offsetHeight } = parentRef;

      const x = (offsetWidth * cords.current.left) / 100;
      const y = (offsetHeight * cords.current.top) / 100;

      gsap.set(ref.current, {
        x,
        y,
      });
    };

    updatePosition();

    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [parentRef]);

  return ref;
};
