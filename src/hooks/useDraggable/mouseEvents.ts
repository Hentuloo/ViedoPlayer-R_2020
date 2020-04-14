import { fromEvent } from 'rxjs';

const createMouseEventStream = (eventName: string) => (
  el: HTMLElement,
) => fromEvent<React.MouseEvent>(el, eventName);

export const mousedown$ = createMouseEventStream('mousedown');
export const mousemove$ = createMouseEventStream('mousemove');
export const mouseleave$ = createMouseEventStream('mouseleave');
export const mouseup$ = createMouseEventStream('mouseup');

export const combined = (el: HTMLElement) => ({
  mousedown$: createMouseEventStream('mousedown')(el),
  mousemove$: createMouseEventStream('mousemove')(el),
  mouseleave$: createMouseEventStream('mouseleave')(el),
  mouseup$: createMouseEventStream('mouseup')(el),
});
