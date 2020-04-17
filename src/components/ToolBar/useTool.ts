import { useEffect, useRef } from 'react';
import { merge, fromEvent } from 'rxjs';
import { take, switchMap, repeat } from 'rxjs/operators';

import { useDraggable } from 'hooks/useDraggable/useDraggable';

import { mouseIsOnElement } from 'config/utils';
import {
  getCordsInsideOverlapElement,
  NewElementDefaultSize,
} from './utils';
import {
  mousedown$,
  mouseup$,
  mouseleave$,
} from 'hooks/useDraggable/dragAndDrop';
import Draggable from 'components/Draggable/Draggable';
import gsap from 'gsap';

export type NewItemCallback = (x: number, y: number) => void;

export const useTool = <E extends HTMLElement>(
  wrapperRef: React.RefObject<HTMLElement>,
  addCallback: NewItemCallback,
  size: NewElementDefaultSize,
) => {
  const ref = useRef<E>(null);

  // const { draggableRef, resetPosition } = useDraggable<E>();

  useEffect(() => {
    const videoWrapper = wrapperRef.current;
    const tool = ref.current;
    if (!videoWrapper || !tool || !addCallback) return;

    const resetAnimation = () => {
      const tl = gsap.timeline();
      tl.to(tool, { duration: 0.2, opacity: 0, scale: 0.7 })
        .set(tool, { x: 0, y: 0 })
        .to(tool, { duration: 0.2, opacity: 1, scale: 1 });
    };

    const addToolWhenDropedOnVideo = ({
      clientY,
      clientX,
    }: MouseEvent) => {
      const isToolInside = mouseIsOnElement(
        { clientY, clientX },
        videoWrapper,
      );
      if (!isToolInside) return;

      const { left, top } = getCordsInsideOverlapElement(
        { clientY, clientX },
        videoWrapper,
        size,
      );

      addCallback(left, top);
    };

    const unSub = Draggable(tool, {
      onDrop: (e) => {
        resetAnimation();
        addToolWhenDropedOnVideo(e);
      },
    });
    return () => unSub.unsubscribe();
  }, []);

  return ref;
};
