import { fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

const createMouseEventStream = (eventName: string) => (el: any) =>
  fromEvent(el, eventName);

export const mousedown$ = createMouseEventStream('mousedown');
export const mousemove$ = createMouseEventStream('mousemove');
export const mouseleave$ = createMouseEventStream('mouseleave');
export const mouseup$ = createMouseEventStream('mouseup');

export const touchdown$ = createMouseEventStream('touchstart');
export const touchemove$ = createMouseEventStream('touchmove');
export const touchleave$ = createMouseEventStream('touchleave');
export const touchup$ = createMouseEventStream('touchend');

const standardizeEvents = map((ev: any) => {
  if (ev.clientX) return ev;
  ev.type === 'touchmove' && ev.preventDefault();
  const touch = ev.touches[0] || ev.changedTouches[0];
  ev.clientX = touch.clientX;
  ev.clientY = touch.clientY;
  return ev;
});

export const down$ = (el: any) =>
  merge(mousedown$(el), touchdown$(el)).pipe(standardizeEvents);

export const move$ = (el: any) =>
  merge(mousemove$(el), touchemove$(el)).pipe(standardizeEvents);

export const leave$ = (el: any) =>
  merge(mouseleave$(el), touchleave$(el)).pipe(standardizeEvents);
export const up$ = (el: any) =>
  merge(mouseup$(el), touchup$(el)).pipe(standardizeEvents);

export const combined = (el: any) => ({
  down$: down$(el),
  move$: move$(el),
  leave$: leave$(el),
  up$: up$(el),
});
