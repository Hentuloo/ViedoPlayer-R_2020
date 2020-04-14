import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import LabelContent from '../styles/LabelContent';
import { EditableLabelProps } from './types';
import { useDraggable } from 'hooks/useDraggable/useDraggable';

import Controllers from './Controllers';
import LabelWrapper, {
  LabelWrapperCord,
} from '../styles/LabelWrapper';

interface WrapperProps extends LabelWrapperCord {
  editMode?: boolean;
}

const StyledController = styled(Controllers)`
  opacity: 0;
`;

export const Wrapper = styled.div<WrapperProps>`
  ${LabelWrapper}
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

const StyledLabelContent = styled(LabelContent)`
  pointer-events: none;
  user-select: none;
`;
export const Textarea = styled.textarea<{ editMode?: boolean }>`
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.color.white[0]};
  resize: none;
  z-index: -1;
  opacity: 0;
  pointer-events: none;
  ${({ editMode }) =>
    editMode &&
    css`
      z-index: 5;
      opacity: 1;
      resize: auto;
      pointer-events: auto;
    `};
`;

const Label: React.FC<EditableLabelProps> = ({
  label: { content, cord, id },
  events: { changeCord },
  ...props
}) => {
  const { draggableRef, setFlag, setOverlapElement } = useDraggable(
    {
      defaultActive: true,
      detectOnlySourceNode: true,
      withOverlapElement: true,
    },
    (x, y) => changeCord({ id, x, y }),
  );
  const [editMode, setEditMode] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const changeEditMode = (flag?: boolean) => {
    setEditMode(flag || !editMode);
    setFlag(!flag);
  };

  useEffect(() => {
    if (!draggableRef.current) return;
    setOverlapElement(draggableRef.current.parentNode);
  }, []);

  return (
    <Wrapper
      ref={draggableRef}
      editMode={editMode}
      {...props}
      {...cord}
    >
      <Textarea
        onClick={handleClick}
        editMode={editMode}
        name="video-label"
        defaultValue={content}
      ></Textarea>
      {!editMode && (
        <StyledLabelContent>
          <span>{content}</span>
        </StyledLabelContent>
      )}
      <StyledController
        editMode={editMode}
        changeEditMode={changeEditMode}
      />
    </Wrapper>
  );
};

export default Label;
