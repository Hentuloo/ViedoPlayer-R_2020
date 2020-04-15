import { useEffect } from 'react';
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

export type NewItemCallback = (x: number, y: number) => void;

export const useTool = (
  wrapperRef: React.RefObject<HTMLElement>,
  addCallback: NewItemCallback,
  size: NewElementDefaultSize,
) => {
  const { draggableRef, resetPosition } = useDraggable();

  useEffect(() => {
    const videoWrapper = wrapperRef.current;
    const tool = draggableRef.current as HTMLElement;
    if (!videoWrapper || !tool || !addCallback) return;

    const drag$ = mousedown$(tool);
    const drop$ = drag$.pipe(
      switchMap(() =>
        merge(
          mouseup$(tool),
          mouseleave$(tool),
          fromEvent(document, 'scroll'),
        ),
      ),
      take(1),
      repeat(),
    );

    const resetToolPosition$ = drop$.subscribe(() => {
      resetPosition();
    });

    const addToolToVideo$ = drop$.subscribe(
      //@ts-ignore
      ({ clientX, clientY }) => {
        const cord = { clientX, clientY };

        const isToolInside = mouseIsOnElement(cord, videoWrapper);
        if (!isToolInside) return;

        const { offsetWidth, offsetHeight } = videoWrapper;
        const { left, top } = getCordsInsideOverlapElement(
          cord,
          { width: offsetWidth, height: offsetHeight },
          size,
        );

        addCallback(left, top);
      },
    );

    return () => {
      resetToolPosition$.unsubscribe();
      addToolToVideo$.unsubscribe();
    };
  }, []);

  return [draggableRef];
};
