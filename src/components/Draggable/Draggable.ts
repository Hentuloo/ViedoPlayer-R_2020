import { combined } from './events';
import {
  map,
  filter,
  switchMap,
  takeUntil,
  repeat,
  take,
} from 'rxjs/operators';
import { fromEvent, Observable, Subscription, merge } from 'rxjs';
import {
  getElementLayers,
  preventElementGoingOutParent,
  draggableStartsOfssets,
} from './utils';

import {
  DraggableStartOffsets,
  DraggableMoveResponse,
} from './types';
import gsap from 'gsap';

export interface DraggableOptions {
  active?: boolean;
  activeCurrent?: React.RefObject<boolean>;
  sourceNode?: boolean;
  onNext?: (props: DraggableMoveResponse) => void;
  onDrop?: (e: MouseEvent) => void;
  onDrag?: (e: MouseEvent) => void;
  clearDrag?: () => void;
  subscribe?: (props: DraggableMoveResponse) => void;
  overlapElement?: HTMLElement;
}

const draggable = (
  element: HTMLElement,
  options: DraggableOptions = {},
) => {
  const {
    active = true,
    sourceNode = false,
    activeCurrent,
    onNext,
    onDrop,
    onDrag,
    subscribe,
    overlapElement,
  } = options;
  const { mousedown$, mousemove$, mouseleave$, mouseup$ } = combined(
    element,
  );

  if (active && activeCurrent) {
    Error('Choose one active method');
  }

  const passWhenDraggableIsActive = () => {
    if (activeCurrent === undefined) {
      return filter(() => active === true);
    }
    return filter(() => activeCurrent.current === true);
  };

  const passWhenTargetIsSource = () =>
    filter((ev) => {
      const { target } = ev as MouseEvent;
      if (!target) return false;
      return sourceNode ? target === element : true;
    });

  //mouse-click
  const drag = mousedown$.pipe(
    passWhenDraggableIsActive(),
    passWhenTargetIsSource(),
  );

  //mouse-up/mouse-leave/document-scroll
  const cancel = merge(
    mouseup$,
    mouseleave$,
    fromEvent(document, 'scroll'),
  );

  //mouse-click then mouse-up/mouse-leave/document-scroll
  const drop = mousedown$.pipe(
    switchMap(() => cancel),
    take(1),
    repeat(),
  );

  //mouse-move
  const move = mousemove$.pipe(passWhenTargetIsSource());

  const draggableMove = (
    start: DraggableStartOffsets,
  ): Observable<DraggableMoveResponse> =>
    move.pipe(
      map((e) => getElementLayers(e)),
      map(({ x, y }) => ({
        width: element.clientWidth,
        height: element.clientHeight,
        left: x - start.offsetX,
        top: y - start.offsetY,
      })),
    );

  const draggable = drag.pipe(
    map((event) => draggableStartsOfssets(event as MouseEvent)),
    switchMap((start) =>
      draggableMove(start as DraggableStartOffsets),
    ),
    preventElementGoingOutParent(overlapElement),
    takeUntil(drop),
    repeat(),
  );

  // container for all subs
  const subs: Subscription[] = [];
  if (subscribe) {
    const sub = draggable.subscribe(subscribe);
    subs.push(sub);
  } else {
    const sub = draggable.subscribe((props) => {
      const { left, top } = props;
      gsap.set(element, { x: left, y: top });
      onNext && onNext(props);
    });
    subs.push(sub);
  }
  if (onDrop) {
    const sub = drop.subscribe((e) => onDrop(e as MouseEvent));
    subs.push(sub);
  }
  if (onDrag) {
    const sub = drag.subscribe((e) => onDrag(e as MouseEvent));
    subs.push(sub);
  }

  return {
    unsubscribe: () => {
      subs.forEach((sub) => {
        sub.unsubscribe();
      });
    },
  };
};

export default draggable;
