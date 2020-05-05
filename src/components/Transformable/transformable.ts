import Interaction from 'moveable';
import { GenerateMoveable } from './types';

import { getComputedTranslateXY } from 'config/utils';

export const transformable: GenerateMoveable = (
  target,
  props = {},
) => {
  const settings = {
    draggable: true,
    target,
    origin: false,
    // styles for cunstrom transformable (themes/globalstyles)
    className: 'transformable-box',
    ...props,
  };

  const moveable = new Interaction(
    props.parent || target.parentNode,
    settings,
  );

  moveable
    .on('dragStart', ({ target, set }) => {
      const { x, y, z } = getComputedTranslateXY(target);
      set([x, y, z]);
    })
    .on('drag', ({ target, transform }) => {
      target.style.transform = transform;
    })
    .on('rotateStart', ({ set }) => {
      const { z } = getComputedTranslateXY(target);
      set(z);
    })
    .on('rotate', ({ target, transform }) => {
      target.style.transform = transform;
    })
    .on('resizeStart', ({ dragStart, setOrigin }) => {
      setOrigin(['%', '%']);
      const { x, y, z } = getComputedTranslateXY(target);
      dragStart && dragStart.set([x, y, z]);
    })
    .on('resize', ({ target, width, height, drag }) => {
      target.style.width = `${width}px`;
      target.style.height = `${height}px`;
      const [x, y, z] = drag.beforeTranslate;
      target.style.transform = `translate(${x}px, ${y}px) rotate(${z}deg)`;
    });

  return moveable;
};
