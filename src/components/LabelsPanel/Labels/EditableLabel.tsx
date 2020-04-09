import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import LabelContent from '../styles/LabelContent';
import { EditableLabelProps } from './types';
export const Controllers = styled.div`
  position: absolute;
  right: 0%;
  top: 0%;
  color: ${({ theme }) => theme.color.white[0]};
  opacity: 0;
`;

export const Wrapper = styled.div<{ editMode?: boolean }>`
  position: relative;
  display: inline-block;
  max-width: 35%;
  max-height: 25%;
  background-color: ${({ theme }) => theme.color.black[0]};
  pointer-events: all;

  &:hover {
    ${Controllers} {
      opacity: 1;
      ${({ editMode }) =>
        editMode &&
        css`
          opacity: 0;
          z-index: -1;
        `};
    }
  }
`;

const StyledLabelContent = styled(LabelContent)<{
  editMode?: boolean;
}>`
  cursor: grabbing;
  ${({ editMode }) =>
    editMode &&
    css`
      opacity: 0;
      z-index: -1;
    `};
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

export const EditIcon = styled.button`
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.color.white[0]};
  cursor: pointer;
`;

const Label: React.FC<EditableLabelProps> = ({
  label: { content },
  defaultEditMode,
  ...props
}) => {
  const [editMode, setEditMode] = useState(defaultEditMode || false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('sd');
  };

  const changeEditMode = (flag?: boolean) => {
    setEditMode(flag || !editMode);
  };

  return (
    <Wrapper editMode={editMode} {...props}>
      <Textarea
        onClick={handleClick}
        editMode={editMode}
        name="video-label"
      >
        {content}
      </Textarea>
      <StyledLabelContent editMode={editMode}>
        <span>{content}</span>
      </StyledLabelContent>
      <Controllers>
        <EditIcon onClick={() => changeEditMode(true)}>
          <span className="sr-only">Edit</span>
          <span className="fa fa-pencil" aria-hidden="true"></span>
        </EditIcon>
      </Controllers>
    </Wrapper>
  );
};

export default Label;
