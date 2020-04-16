import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import Context from './Context';
import { useResizeCallback } from 'hooks/useResizeCallback';

interface TextareaI {
  editMode?: boolean;
}

export const TextareaElement = styled.textarea<TextareaI>`
  position: relative;
  align-self: stretch;
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

export interface TextAreaProps {}

const TextArea: React.SFC<TextAreaProps> = () => {
  const {
    handleChangeLabelSize,
    editModeFlag,
    label: { content },
  } = useContext(Context);
  const ref = useResizeCallback<HTMLTextAreaElement>(
    handleChangeLabelSize,
  );

  return (
    <TextareaElement
      ref={ref}
      editMode={editModeFlag}
      name="video-label"
      defaultValue={content}
    ></TextareaElement>
  );
};

export default TextArea;
