export interface MouseCord {
  clientX: number;
  clientY: number;
}
export interface NewElementDefaultSize {
  width: number;
  height: number;
}
export interface ElementSize {
  width: number;
  height: number;
}
export const getCordsInsideOverlapElement = (
  { clientX, clientY }: MouseCord,
  target: HTMLElement,
  {
    width: elementWidthPercent,
    height: elementHeightPercent,
  }: NewElementDefaultSize,
) => {
  const { width, height, top, left } = target.getBoundingClientRect();

  const xPerecentage = ((clientX - left) / width) * 100;
  const yPercentage = ((clientY - top) / height) * 100;

  const cords = {
    left: xPerecentage - elementWidthPercent / 2,
    top: yPercentage - elementHeightPercent / 2,
  };

  const leftEdge = xPerecentage < elementWidthPercent;
  const rightEdge = xPerecentage > 100 - elementWidthPercent;
  const topEdge = yPercentage < elementHeightPercent;
  const bottomEdge = yPercentage > 100 - elementHeightPercent;

  if (leftEdge) {
    cords.left = 0;
  } else if (rightEdge) {
    cords.left = 100 - elementWidthPercent;
  }
  if (topEdge) {
    cords.top = 0;
  } else if (bottomEdge) {
    cords.top = 100 - elementHeightPercent;
  }

  return cords;
};
