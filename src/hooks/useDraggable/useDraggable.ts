import { useEffect, useRef, useCallback } from 'react';
import { fromEvent, Observable } from 'rxjs';
import { map, filter, switchMap, takeUntil } from 'rxjs/operators';
import {
  preventElementGoingOutParent,
  getLayers,
  offsetsFromMouseEvent,
} from './utils';
import gsap from 'gsap';

type MouseMove = React.MouseEvent<Element, MouseEvent>;
type Stream = Observable<MouseMove>;

export type DraggableStreams = {
  mousedown: Stream;
  mousemove: Stream;
  mouseleave: Stream;
  mouseup: Stream;
};

export interface DraggableAPI {
  draggableRef: React.RefObject<any>;
  parentRef: React.RefObject<any>;
  dropSide: React.RefObject<any>;
  flag: React.RefObject<boolean>;
  setFlag: (flag?: boolean) => void;
  draggableStreams: (el: HTMLElement) => DraggableStreams;
  resetPosition: () => void;
}

export interface DraggableOpt {
  defaultActive?: boolean;
  detectOnlySourceNode?: boolean;
}

export const useDraggable = (options: DraggableOpt): DraggableAPI => {
  const {
    defaultActive = true,
    detectOnlySourceNode = false,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const overlapElement = useRef<HTMLElement>(null);
  const dropSide = useRef<HTMLElement>(null);
  const isActive = useRef<boolean>(defaultActive);

  const draggableStreams = (el: HTMLElement) => {
    const mousedown$ = fromEvent<React.MouseEvent>(el, 'mousedown');
    const mousemove$ = fromEvent<React.MouseEvent>(el, 'mousemove');
    const mouseleave$ = fromEvent<React.MouseEvent>(el, 'mouseleave');
    const mouseup$ = fromEvent<React.MouseEvent>(el, 'mouseup');
    return {
      mousedown: mousedown$ || null,
      mousemove: mousemove$ || null,
      mouseleave: mouseleave$ || null,
      mouseup: mouseup$ || null,
    };
  };

  const setActive = (flag?: boolean) => {
    isActive.current = flag || !isActive.current;
  };

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const {
      mousedown,
      mousemove,
      mouseleave,
      mouseup,
    } = draggableStreams(target);

    const passWhenDraggableIsActive = (isActive: boolean) =>
      filter<MouseMove>(() => isActive === true);

    const passWhenTargetIsSource = () =>
      filter((ev: MouseMove) =>
        detectOnlySourceNode ? ev.target === target : true,
      );

    const draggable = mousedown.pipe(
      passWhenDraggableIsActive(isActive.current),
      passWhenTargetIsSource(),
      map((e) => offsetsFromMouseEvent(e)),
      switchMap((start) =>
        mousemove.pipe(
          passWhenTargetIsSource(),
          map((e) => getLayers(e)),
          map(({ x, y }) => ({
            width: target.clientWidth,
            height: target.clientHeight,
            left: x - start.offsetX,
            top: y - start.offsetY,
          })),
          preventElementGoingOutParent(
            overlapElement.current as HTMLElement,
          ),
          takeUntil(mouseleave),
          takeUntil(mouseup),
          takeUntil(fromEvent(document, 'scroll')),
        ),
      ),
    );

    const sub = draggable.subscribe(({ left, top }) => {
      gsap.set(target, { x: left, y: top });
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

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
    parentRef: overlapElement,
    dropSide,
    draggableStreams: draggableStreams,
    resetPosition,
  };
};
