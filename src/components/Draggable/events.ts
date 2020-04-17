import { fromEvent } from 'rxjs';

const createMouseEventStream = (eventName: string) => (el: any) =>
  fromEvent(el, eventName);

export const mousedown$ = createMouseEventStream('mousedown');
export const mousemove$ = createMouseEventStream('mousemove');
export const mouseleave$ = createMouseEventStream('mouseleave');
export const mouseup$ = createMouseEventStream('mouseup');

export const combined = (el: any) => ({
  mousedown$: createMouseEventStream('mousedown')(el),
  mousemove$: createMouseEventStream('mousemove')(el),
  mouseleave$: createMouseEventStream('mouseleave')(el),
  mouseup$: createMouseEventStream('mouseup')(el),
});
