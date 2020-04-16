import { useRef, useEffect } from 'react';
import { fromEvent } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';

export const useResizeCallback = <
  T extends HTMLElement = HTMLElement
>(
  callback: (width: number, height: number) => void,
) => {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const donw$ = fromEvent<HTMLElementEvent<T>>(el, 'mousedown');
    const up$ = fromEvent<HTMLElementEvent<T>>(el, 'mouseup');

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

    return () => {
      resizeSub.unsubscribe();
    };
  }, []);

  return ref;
};
