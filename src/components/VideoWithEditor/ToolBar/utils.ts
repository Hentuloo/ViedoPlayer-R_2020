import { progressBarHeight } from 'components/Video/config';
import { defaultLabel } from '../config';

export interface MouseCord {
  clientX: number;
  clientY: number;
}

export const getLabeRectInsideWrapper = (
  { clientX, clientY }: MouseCord,
  element: HTMLElement,
) => {
  const {
    left,
    top,
    width,
    height,
  } = element.getBoundingClientRect();
  const xInsideElement = clientX - left;
  const yInsideElement = clientY - top;
  const labelDefaultWidth = width * (defaultLabel.cord.width / 100);
  const labelDefaultHeight =
    height * (defaultLabel.cord.height / 100);

  const cords = { left: xInsideElement, top: yInsideElement };
  const leftEdge = xInsideElement < labelDefaultWidth;
  const rightEdge = xInsideElement > width - labelDefaultWidth;
  const topEdge = yInsideElement < labelDefaultHeight;
  const bottomEdge =
    yInsideElement > height - labelDefaultHeight - progressBarHeight;

  if (leftEdge) {
    cords.left = 0;
  } else if (rightEdge) {
    cords.left = width - labelDefaultWidth;
  }
  if (topEdge) {
    cords.top = 0;
  } else if (bottomEdge) {
    cords.top = height - labelDefaultHeight + progressBarHeight;
  }

  return cords;
};
