import { fromEvent, merge } from 'rxjs';
import {
  map,
  filter,
  switchMap,
  takeUntil,
  repeat,
  take,
} from 'rxjs/operators';
import {
  preventElementGoingOutParent,
  getLayers,
  offsetsFromMouseEvent,
  OffsetFromMouseEventRespnse,
} from './utils';
import {
  mousedown$,
  mousemove$,
  mouseleave$,
  mouseup$,
} from './mouseEvents';
export * from './mouseEvents';

export interface DragAndDropInterface<E, O> {
  el: E;
  overlapElement?: O | undefined;
  isActive: { current: boolean };
  detectOnlySourceNode: boolean;
}

export const dragAndDrop = <
  E extends HTMLElement = HTMLElement,
  O extends HTMLElement = HTMLElement
>({
  el,
  isActive,
  overlapElement,
  detectOnlySourceNode,
}: DragAndDropInterface<E, O>) => {
  const passWhenDraggableIsActive = () =>
    filter(() => isActive.current === true);

  const passWhenTargetIsSource = () =>
    filter((ev) => {
      const { target } = ev as MouseEvent;
      return detectOnlySourceNode ? target === el : true;
    });

  const drag = mousedown$(el).pipe(
    passWhenDraggableIsActive(),
    passWhenTargetIsSource(),
  );

  const drop = mousedown$(el).pipe(
    switchMap(() =>
      merge(
        mouseup$(el),
        mouseleave$(el),
        fromEvent(document, 'scroll'),
      ),
    ),
    take(1),
    repeat(),
  );

  const move = (start: OffsetFromMouseEventRespnse) =>
    mousemove$(el).pipe(
      passWhenTargetIsSource(),
      map((e) => getLayers(e)),
      map(({ x, y }) => ({
        width: el.clientWidth,
        height: el.clientHeight,
        left: x - start.offsetX,
        top: y - start.offsetY,
      })),
      preventElementGoingOutParent(overlapElement),
    );

  const draggable = drag.pipe(
    map((event: any) => offsetsFromMouseEvent(event)),
    switchMap((start) => move(start)),
    takeUntil(drop),
    repeat(),
  );

  return {
    draggable,
    drag,
    drop,
    move,
  };
};
