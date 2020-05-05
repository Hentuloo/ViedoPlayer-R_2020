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
      const { x, y, z } = getComputedTranslateXY(
        target as HTMLElement,
      );
      set([x, y, z]);
    })
    .on('drag', ({ target, translate }) => {
      const [x, y, z] = translate;
      target.style.transform = `translate(${x}px, ${y}px) rotate(${z}deg)`;
    })
    .on('rotate', ({ target, transform }) => {
      target.style.transform = transform;
    })
    .on('resize', ({ target, width, height }) => {
      target.style.width = `${width}px`;
      target.style.height = `${height}px`;
    });

  return moveable;
};
