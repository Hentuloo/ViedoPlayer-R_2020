import { mouseIsOnElement } from 'config/utils';
import { getCordsInsideOverlapElement } from './utils';

import draggable from 'components/draggable/draggable';
import gsap from 'gsap';
import { DraggableEvent } from 'components/draggable/types';

export interface CallbackArguments {
  x: number;
  y: number;
}

export interface UseToolOptions {
  wrapper: React.RefObject<HTMLElement>;
  width: number;
  height: number;
}

export const addToolDraggable = <E extends HTMLElement>(
  tool: E,
  { wrapper, width, height }: UseToolOptions,
  callback: (x: number, y: number) => void,
) => {
  const resetAnimation = () => {
    const tl = gsap.timeline();
    tl.to(tool, { duration: 0.2, opacity: 0, scale: 0.7 })
      .set(tool, { x: 0, y: 0 })
      .to(tool, { duration: 0.2, opacity: 1, scale: 1 });
  };

  const addToolWhenDropedOnVideo = ({
    clientY,
    clientX,
  }: DraggableEvent) => {
    const videoWrapper = wrapper.current;
    if (!videoWrapper || !tool) return;

    const isToolInside = mouseIsOnElement(
      { clientY, clientX },
      videoWrapper,
    );

    if (!isToolInside) return;

    const { left, top } = getCordsInsideOverlapElement(
      { clientY, clientX },
      videoWrapper,
      { width, height },
    );

    callback(left, top);
  };

  const unSub = draggable(tool, {
    onDrop: (e) => {
      resetAnimation();
      addToolWhenDropedOnVideo(e);
    },
  });

  return unSub;
};
