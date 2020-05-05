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

export const getComputedTranslateXY = (
  obj: HTMLElement | SVGElement,
) => {
  const cord = { x: 0, y: 0, z: 0 };
  const style = getComputedStyle(obj);
  const transform = style.transform || style.webkitTransform;

  let mat = transform.match(/^matrix3d\((.+)\)$/);

  mat = transform.match(/^matrix\((.+)\)$/);
  if (mat) {
    const values = mat[1].split(', ');
    cord.z = Math.round(
      Math.atan2(Number(values[1]), Number(values[0])) *
        (180 / Math.PI),
    );
    cord.x = Number(parseFloat(values[4]).toFixed(2));
    cord.y = Number(parseFloat(values[5]).toFixed(2));
  }

  return { ...cord };
};
