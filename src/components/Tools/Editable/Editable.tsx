import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { useToolPosition } from '../utils/useToolPosition';
import Controllers from './Controllers';
import { getComputedTranslateXY } from 'config/utils';
import draggable from 'components/draggable/draggable';
import ToolWrapper from '../utils/Wrapper';
import { useDispatch } from 'react-redux';
import {
  changeToolCord,
  changeToolSize,
} from 'store/actions/toolsActions';
import { EditableToolComponent } from '../types';
import { resizeCallback } from 'config/resizeCallback';

const StyledController = styled(Controllers)`
  opacity: 1;
  z-index: 10;
  font-size: 1em;
  ${({ theme }) => theme.mediaQuery.md} {
    opacity: 0;
  }
`;
interface WrapperInterface {
  editMode: boolean;
}

export const StyledWrapper = styled(ToolWrapper)<WrapperInterface>`
  pointer-events: all;
  user-select: none;
  cursor: grab;

  &:active {
    cursor: grabbing;
    z-index: 10;
  }

  &:hover {
    ${StyledController} {
      opacity: 1;
      transition: opacity 0.4s ease;
    }

    ${({ editMode }) =>
      !editMode &&
      css`
        resize: none;
      `};

    ${({ editMode }) =>
      editMode &&
      css`
        cursor: auto;
        overflow: auto;
        resize: both;
      `};
  }
`;

const EditableLabelWrapper: React.SFC<EditableToolComponent> = ({
  parentRef: { current: parentRef },
  tool,
  render,
  ...props
}) => {
  const { cord, id } = tool;
  const dispatch = useDispatch();
  const ref = useToolPosition<HTMLDivElement>(cord, parentRef);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // resize logic (changetoolsize)
    const el = ref.current;
    if (!el || !parentRef) return;

    const sub = resizeCallback(el, (w, h) => {
      const { offsetWidth, offsetHeight } = parentRef;
      //transform to percents by parent wrapper
      let width = Number(((w / offsetWidth) * 100).toFixed(2));
      let height = Number(((h / offsetHeight) * 100).toFixed(2));

      //set max size
      width = width >= 50 ? 50 : width;
      height = height >= 50 ? 50 : height;

      el.style.width = `${width}%`;
      el.style.height = `${height}%`;

      dispatch(changeToolSize(id, width, height));
    });
    if (!sub) return;
    return () => sub.unsubscribe();
  }, [ref, dispatch, id, parentRef]);

  useEffect(() => {
    // On page resize set new max size
    const el = ref.current;
    if (!el || !parentRef) return;

    const setMaxSize = () => {
      const { offsetWidth, offsetHeight } = parentRef as HTMLElement;

      el.style.maxWidth = `${(offsetWidth / 2).toFixed(2)}px `;
      el.style.maxHeight = `${(offsetHeight / 2).toFixed(2)}px`;
    };
    setMaxSize();

    window.addEventListener('resize', setMaxSize);
    return () => window.removeEventListener('resize', setMaxSize);
  }, [ref, parentRef]);

  useEffect(() => {
    // draggable logic
    const el = ref.current;
    if (!el || !parentRef) return;
    const sub = draggable(el, {
      overlapElement: parentRef,
      active: !editMode,
      sourceNode: true,
      onDrop: () => {
        if (!parentRef || editMode) return;
        const { x, y } = getComputedTranslateXY(el);
        const { offsetWidth, offsetHeight } = parentRef;

        const percentX = (x / offsetWidth) * 100;
        const percentY = (y / offsetHeight) * 100;
        dispatch(changeToolCord(id, { x: percentX, y: percentY }));
      },
    });

    return () => sub.unsubscribe();
  }, [editMode, ref, dispatch, id, parentRef]);

  const handleChangeEditMode = (flag: boolean) => {
    setEditMode(flag);
  };

  return (
    <StyledWrapper
      ref={ref}
      {...props}
      size={{
        width: cord.width,
        height: cord.height,
      }}
      editMode={editMode}
    >
      {render(editMode, handleChangeEditMode)}
      <StyledController
        editMode={editMode}
        onChange={handleChangeEditMode}
      />
    </StyledWrapper>
  );
};

export default EditableLabelWrapper;
