export interface MouseCord {
  clientX: number;
  clientY: number;
}

export const mouseIsOnElement = (
  { clientX, clientY }: MouseCord,
  element: HTMLElement,
) => {
  const {
    left,
    top,
    width,
    height,
  } = element.getBoundingClientRect();
  return (
    clientX > left &&
    clientX < left + width &&
    clientY > top &&
    clientY < top + height
  );
};

export const getComputedTranslateXY = (obj: HTMLElement) => {
  const cord = { x: 0, y: 0 };
  const style = getComputedStyle(obj);
  const transform = style.transform || style.webkitTransform;

  let mat = transform.match(/^matrix3d\((.+)\)$/);

  mat = transform.match(/^matrix\((.+)\)$/);
  if (mat) {
    cord.x = Number(parseFloat(mat[1].split(', ')[4]).toFixed(2));
    cord.y = Number(parseFloat(mat[1].split(', ')[5]).toFixed(2));
  }

  return { ...cord };
};
