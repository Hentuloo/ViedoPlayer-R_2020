import { fromEvent, Observable, merge } from 'rxjs';
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

type MouseMove = React.MouseEvent<Element, MouseEvent>;
type Stream = Observable<MouseMove>;

export type DraggableStreams = {
  mousedown: Stream;
  mousemove: Stream;
  mouseleave: Stream;
  mouseup: Stream;
};

export interface DragAndDropInterface {
  el: HTMLElement;
  overlapElement?: HTMLElement | undefined;
  isActive: { current: boolean };
  detectOnlySourceNode: boolean;
}

export const dragAndDrop = ({
  el,
  isActive,
  overlapElement,
  detectOnlySourceNode,
}: DragAndDropInterface) => {
  const passWhenDraggableIsActive = () =>
    filter<MouseMove>(() => isActive.current === true);

  const passWhenTargetIsSource = () =>
    filter((ev: MouseMove) =>
      detectOnlySourceNode ? ev.target === el : true,
    );

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
    map((event) => offsetsFromMouseEvent(event)),
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
