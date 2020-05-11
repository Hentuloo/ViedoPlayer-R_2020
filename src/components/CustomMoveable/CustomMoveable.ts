import Interaction from 'moveable';
import { MoveableTarget, MoveableProps } from './types';

import { getComputedTranslateXY } from 'config/utils';

export class CustomMoveable extends Interaction {
  static createWithEvents = (
    target: MoveableTarget,
    options: MoveableProps,
  ) => {
    return new CustomMoveable(target, {
      draggable: true,
      resizable: true,
      rotatable: true,
      snappable: true,
      ...options,
    })
      .bindDragStart()
      .bindRotateStart()
      .bindRotate()
      .bindResizeStart()
      .bindResize();
  };

  constructor(target: MoveableTarget, options: MoveableProps) {
    super(options.parent || target.parentNode, {
      target,
      origin: false,
      // styles for cunstrom transformable (themes/globalstyles)
      className: 'transformable-box',
      ...options,
    });
  }

  public bindResize = () => {
    return this.on('resize', ({ target, width, height, drag }) => {
      target.style.width = `${width}px`;
      target.style.height = `${height}px`;
      const [x, y, z] = drag.beforeTranslate;
      target.style.transform = `translate(${x}px, ${y}px) rotate(${z}deg)`;
    });
  };

  public bindResizeStart = () => {
    return this.on(
      'resizeStart',
      ({ dragStart, setOrigin, target }) => {
        setOrigin(['%', '%']);
        const { x, y, z } = getComputedTranslateXY(target);
        dragStart && dragStart.set([x, y, z]);
      },
    );
  };

  public bindRotate = () => {
    return this.on('rotate', ({ target, transform }) => {
      target.style.transform = transform;
    });
  };

  public bindRotateStart = () => {
    return this.on('drag', ({ target, transform }) => {
      target.style.transform = transform;
    });
  };

  public bindDrag = () => {
    return this.on('drag', ({ target, transform }) => {
      target.style.transform = transform;
    });
  };

  public bindDragStart = () => {
    return this.on('dragStart', ({ target, set }) => {
      const { x, y, z } = getComputedTranslateXY(target);
      set([x, y, z]);
    });
  };
}
