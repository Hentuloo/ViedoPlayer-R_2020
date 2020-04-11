import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import LabelContent from '../styles/LabelContent';
import { EditableLabelProps } from './types';
import { useDraggable } from 'hooks/useDraggable/useDraggable';

import Controllers from './Controllers';

const StyledController = styled(Controllers)`
  opacity: 0;
`;

export const Wrapper = styled.div<{ editMode?: boolean }>`
  position: relative;
  display: inline-block;
  max-width: 35%;
  max-height: 25%;
  background-color: ${({ theme }) => theme.color.black[0]};
  pointer-events: all;
  user-select: none;
  cursor: grab;

  &:active {
    cursor: grabbing;
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
  label: { content },
  defaultEditMode,
  ...props
}) => {
  const { draggableRef, setFlag, parentRef } = useDraggable({
    defaultActive: true,
    detectOnlySourceNode: true,
  });
  const [editMode, setEditMode] = useState(defaultEditMode || false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const changeEditMode = (flag?: boolean) => {
    setEditMode(flag || !editMode);
    setFlag(!flag);
  };
  useEffect(() => {
    if (!draggableRef.current) return;
    //@ts-ignore
    parentRef.current = draggableRef.current.parentNode;
  }, []);

  return (
    <Wrapper ref={draggableRef} editMode={editMode} {...props}>
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
