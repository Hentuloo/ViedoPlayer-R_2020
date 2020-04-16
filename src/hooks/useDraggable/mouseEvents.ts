import { fromEvent } from 'rxjs';
import { MouseEvent } from 'react';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';

const createMouseEventStream = <T extends HTMLElement = HTMLElement>(
  eventName: string,
) => (el: T) =>
  fromEvent<FromEventTarget<MouseEvent<HTMLElementEvent<T>>>>(
    el,
    eventName,
  );

export const mousedown$ = createMouseEventStream('mousedown');
export const mousemove$ = createMouseEventStream('mousemove');
export const mouseleave$ = createMouseEventStream('mouseleave');
export const mouseup$ = createMouseEventStream('mouseup');

export const combined = <T extends HTMLElement = HTMLElement>(
  el: T,
) => ({
  mousedown$: createMouseEventStream('mousedown')(el),
  mousemove$: createMouseEventStream('mousemove')(el),
  mouseleave$: createMouseEventStream('mouseleave')(el),
  mouseup$: createMouseEventStream('mouseup')(el),
});
