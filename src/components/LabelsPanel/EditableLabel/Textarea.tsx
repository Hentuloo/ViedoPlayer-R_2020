import React from 'react';
import styled, { css } from 'styled-components';
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

type MouseEvent = HTMLElementEvent<HTMLTextAreaElement>;

export interface TextAreaProps {
  editMode: boolean;
  content: string;
  onChangeSize: (w: number, h: number) => void;
}

const TextArea: React.SFC<TextAreaProps> = ({
  editMode,
  content,
  onChangeSize,
}) => {
  const ref = useResizeCallback<HTMLTextAreaElement>(onChangeSize);
  return (
    <TextareaElement
      ref={ref}
      editMode={editMode}
      name="video-label"
      defaultValue={content}
    ></TextareaElement>
  );
};

export default TextArea;
