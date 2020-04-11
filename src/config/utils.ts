export interface MouseCord {
  clientX: number;
  clientY: number;
}

export const detectMouseIsOnElement = (
  { clientX, clientY }: MouseCord,
  element: HTMLElement,
) => {
  const {
    left,
    top,
    width,
    height,
  } = element.getBoundingClientRect();
  if (
    clientX > left &&
    clientX < left + width &&
    clientY > top &&
    clientY < top + height
  ) {
    return true;
  }
  return false;
};
