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
  DraggableEvent,
} from './types';
import gsap from 'gsap';

export interface DraggableOptions {
  active?: boolean;
  activeCurrent?: React.RefObject<boolean>;
  sourceNode?: boolean;
  axisX?: boolean;
  axisY?: boolean;
  onNext?: (props: DraggableMoveResponse) => void;
  onDrop?: (e: DraggableEvent) => void;
  onDrag?: (e: DraggableEvent) => void;
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
    axisX = true,
    axisY = true,
    subscribe,
    overlapElement,
  } = options;
  const { down$, move$, leave$, up$ } = combined(element);

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
      const { target } = ev as DraggableEvent;
      if (!target) return false;
      return sourceNode ? target === element : true;
    });

  //mouse-click
  const drag = down$.pipe(
    passWhenDraggableIsActive(),
    passWhenTargetIsSource(),
  );

  //mouse-up/mouse-leave/document-scroll
  const cancel = merge(up$, leave$, fromEvent(document, 'scroll'));

  //mouse-click then mouse-up/mouse-leave/document-scroll
  const drop = down$.pipe(
    switchMap(() => cancel),
    take(1),
    repeat(),
  );

  //mouse-move
  const move = move$.pipe(passWhenTargetIsSource());

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
    map((event) => draggableStartsOfssets(event as DraggableEvent)),
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

      gsap.set(element, {
        x: axisX ? left : '=',
        y: axisY ? top : '=',
      });
      onNext && onNext(props);
    });
    subs.push(sub);
  }
  if (onDrop) {
    const sub = drop.subscribe((e) => onDrop(e as DraggableEvent));
    subs.push(sub);
  }
  if (onDrag) {
    const sub = drag.subscribe((e) => onDrag(e as DraggableEvent));
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
