import { fromEvent, merge } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';

export const resizeCallback = <T extends HTMLElement = HTMLElement>(
  el: T,
  callback: (width: number, height: number) => void,
) => {
  if (!el) return;

  const donw$ = merge(
    fromEvent<HTMLElementEvent<T>>(el, 'mousedown'),
    fromEvent<HTMLElementEvent<T>>(el, 'touchstart'),
  );
  const up$ = merge(
    fromEvent<HTMLElementEvent<T>>(el, 'mouseup'),
    fromEvent<HTMLElementEvent<T>>(el, 'touchend'),
  );

  const getElementOffsets = (event: any) => {
    const { offsetWidth, offsetHeight } = event.target as T;
    return [offsetWidth, offsetHeight];
  };

  const resize$ = donw$.pipe(
    map(getElementOffsets),
    switchMap(([startWidth, startHeight]) =>
      up$.pipe(
        map(getElementOffsets),
        filter(
          ([width, height]) =>
            width !== startWidth || height !== startHeight,
        ),
      ),
    ),
  );

  const resizeSub = resize$.subscribe(([width, height]) =>
    callback(width, height),
  );

  return resizeSub;
};
