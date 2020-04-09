import { useEffect, useRef } from 'react';
import { fromEvent } from 'rxjs';
import { map, filter, switchMap, takeUntil } from 'rxjs/operators';

export const useDraggable = (
  defaultActive?: boolean,
): [
  React.RefObject<HTMLDivElement>,
  React.RefObject<boolean>,
  (flag?: boolean) => void,
] => {
  const ref = useRef<HTMLDivElement>(null);
  const isActive = useRef<boolean>(defaultActive || true);

  const setActive = (flag?: boolean) => {
    isActive.current = flag || !isActive.current;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mousedown$ = fromEvent<MouseEvent>(el, 'mousedown');
    const mousemove$ = fromEvent<MouseEvent>(el, 'mousemove');
    const mouseup$ = fromEvent<MouseEvent>(el, 'mouseup');

    const draggable = mousedown$.pipe(
      filter(() => isActive.current === true),
      switchMap((startMove) => {
        //@ts-ignore
        const rect = startMove.currentTarget.getBoundingClientRect();
        const offsetX = startMove.clientX - rect.left;
        const offsetY = startMove.clientY - rect.top;

        return mousemove$.pipe(
          map(({ clientX, clientY }) => ({
            left: clientX - offsetX,
            top: clientY - offsetY,
          })),
          takeUntil(fromEvent(document, 'scroll')),
          takeUntil(mouseup$),
        );
      }),
    );

    draggable.subscribe((pos) => {
      el.style.transform = `translate(${pos.left}px, ${pos.top}px)`;
    });
  }, []);

  return [ref, isActive, setActive];
};
