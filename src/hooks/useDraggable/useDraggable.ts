import { useEffect, useRef, useCallback, useState } from 'react';
import { getComputedTranslateXY } from './utils';
import gsap from 'gsap';
import { dragAndDrop } from './dragAndDrop';

export interface DraggableAPI {
  draggableRef: React.RefObject<any>;
  flag: React.RefObject<boolean>;
  setFlag: (flag?: boolean) => void;
  setOverlapElement: (newElement: HTMLElement) => void;
  resetPosition: () => void;
}

export interface DraggableOpt {
  defaultActive?: boolean;
  detectOnlySourceNode?: boolean;
  withOverlapElement?: true;
}

export type DraggableCallback = (x: number, y: number) => void;

export const useDraggable = (
  options: DraggableOpt = {},
  draggableCallback?: DraggableCallback,
): DraggableAPI => {
  const {
    defaultActive = true,
    detectOnlySourceNode = false,
    withOverlapElement = false,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const isActive = useRef<boolean>(defaultActive);

  const overlapElement = useRef<HTMLElement>();
  const [isOverlapElementSet, setOverlapElementFlag] = useState<
    Boolean
  >(false);

  const setActive = (flag?: boolean) => {
    isActive.current = flag || !isActive.current;
  };

  const setOverlapElement = (newElement: HTMLElement) => {
    if (!isOverlapElementSet) {
      setOverlapElementFlag(true);
      overlapElement.current = newElement;
    }
  };

  useEffect(() => {
    if (withOverlapElement && !isOverlapElementSet) return;

    const element = ref.current;
    if (!element) return;

    const { draggable, drop } = dragAndDrop({
      el: element,
      overlapElement: overlapElement.current,
      detectOnlySourceNode,
      isActive: isActive.current,
    });

    const draggableSub = draggable.subscribe(({ left, top }) => {
      gsap.set(element, { x: left, y: top });
    });
    let dropSubscribe =
      draggableCallback &&
      drop.subscribe(() => {
        const { x, y } = getComputedTranslateXY(element);
        draggableCallback(x, y);
      });

    return () => {
      draggableSub.unsubscribe();
      dropSubscribe && dropSubscribe.unsubscribe();
    };
  }, [isOverlapElementSet]);

  const resetPosition = useCallback(() => {
    const target = ref.current;
    if (!target) return;
    const tl = gsap.timeline();
    tl.to(target, { duration: 0.2, opacity: 0, scale: 0.7 })
      .set(target, { x: 0, y: 0 })
      .to(target, { duration: 0.2, opacity: 1, scale: 1 });
  }, [ref.current]);

  return {
    draggableRef: ref,
    flag: isActive,
    setFlag: setActive,
    setOverlapElement,
    resetPosition,
  };
};
