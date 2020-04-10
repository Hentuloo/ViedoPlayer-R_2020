import { useEffect, useRef } from 'react';
import { fromEvent } from 'rxjs';
import { map, filter, switchMap, takeUntil } from 'rxjs/operators';
import {
  preventElementGoingOutParent,
  getLayers,
  getRectWithOffsets,
  detectOnlySourceNodeFilter,
} from './utils';

export type DraggableAPI = [
  React.RefObject<HTMLDivElement>,
  React.RefObject<boolean>,
  (flag?: boolean) => void,
  React.RefObject<HTMLDivElement>,
];

export interface DraggableOptions {
  defaultActive?: boolean;
  detectOnlySourceNode?: boolean;
}

export const useDraggable = ({
  defaultActive = true,
  detectOnlySourceNode = false,
}: DraggableOptions): DraggableAPI => {
  const ref = useRef<HTMLDivElement>(null);
  const overlapElement = useRef<HTMLDivElement>(null);
  const isActive = useRef<boolean>(defaultActive);

  const setActive = (flag?: boolean) => {
    isActive.current = flag || !isActive.current;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mousedown$ = fromEvent<React.MouseEvent>(el, 'mousedown');
    const mousemove$ = fromEvent<React.MouseEvent>(el, 'mousemove');
    const mouseleave$ = fromEvent<React.MouseEvent>(el, 'mouseleave');
    const mouseup$ = fromEvent<React.MouseEvent>(el, 'mouseup');

    const draggable = mousedown$.pipe(
      detectOnlySourceNodeFilter(detectOnlySourceNode || false, el),
      filter(() => isActive.current === true),
      switchMap((e) => {
        e.stopPropagation();
        //@ts-ignore
        const overlapParent: HTMLElement = overlapElement.current;
        const {
          offsetX,
          offsetY,
          width,
          height,
        } = getRectWithOffsets(e);

        return mousemove$.pipe(
          detectOnlySourceNodeFilter(
            detectOnlySourceNode || false,
            el,
          ),
          map((e) => {
            e.stopPropagation();
            const { x, y } = getLayers(e);
            return {
              width,
              height,
              left: x - offsetX,
              top: y - offsetY,
            };
          }),
          takeUntil(mouseleave$),
          takeUntil(mouseup$),
          takeUntil(fromEvent(document, 'scroll')),
          preventElementGoingOutParent(overlapParent),
        );
      }),
    );

    const sub = draggable.subscribe(({ left, top }) => {
      el.style.transform = `translate(${left}px, ${top}px)`;
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return [ref, isActive, setActive, overlapElement];
};
