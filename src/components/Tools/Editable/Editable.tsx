import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useToolPosition } from '../utils/useToolPosition';
import Controllers from './Controllers';
import { getComputedTranslateXY } from 'config/utils';
import draggable from 'components/draggable/draggable';
import ToolWrapper from '../utils/Wrapper';
import { useDispatch } from 'react-redux';
import { changeToolCord } from 'store/actions/toolsActions';
import { EditableToolComponent } from '../types';

const StyledController = styled(Controllers)`
  opacity: 1;
  z-index: 10;
  font-size: 1em;
  ${({ theme }) => theme.mediaQuery.md} {
    opacity: 0;
  }
`;

export const StyledWrapper = styled(ToolWrapper)`
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
    }
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
    const el = ref.current;
    if (!el || !parentRef) return;
    const sub = draggable(el, {
      overlapElement: parentRef,
      active: !editMode,
      sourceNode: true,
      onDrop: () => {
        if (!parentRef) return;
        const { x, y } = getComputedTranslateXY(el);
        const { offsetWidth, offsetHeight } = parentRef;

        const percentX = (x / offsetWidth) * 100;
        const percentY = (y / offsetHeight) * 100;

        dispatch(changeToolCord(id, { x: percentX, y: percentY }));
      },
    });

    return () => sub.unsubscribe();
  }, [editMode, ref.current]);

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
