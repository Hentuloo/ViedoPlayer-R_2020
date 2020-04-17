import React, { useContext, useEffect, useState } from 'react';
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

  z-index: -1;
  opacity: 0;
  pointer-events: none;
  ${({ editMode }) =>
    !editMode &&
    css`
      resize: none;
    `};
  ${({ editMode }) =>
    editMode &&
    css`
      z-index: 5;
      opacity: 1;
      resize: auto;
      pointer-events: auto;
    `};
`;

export interface TextAreaProps {
  parentRef: React.RefObject<HTMLDivElement>;
}

const TextArea: React.SFC<TextAreaProps> = ({ parentRef }) => {
  const {
    handleChangeLabelSize,
    handleChangeContent,
    editModeFlag,
    label: { content },
  } = useContext(Context);
  const ref = useResizeCallback<HTMLTextAreaElement>(
    handleChangeLabelSize,
  );
  const [value, setValue] = useState<string>(content);

  useEffect(() => {
    const el = ref.current;
    const parent = parentRef.current;
    if (!el || !parent) return;

    const setMaxSize = () => {
      const { offsetWidth, offsetHeight } = parent as HTMLElement;
      el.style.width = 'auto';
      el.style.height = 'auto';
      el.style.maxWidth = `${(offsetWidth / 2).toFixed(2)}px `;
      el.style.maxHeight = `${(offsetHeight / 2).toFixed(2)}px`;
    };
    setMaxSize();

    window.addEventListener('resize', setMaxSize);
    return () => window.removeEventListener('resize', setMaxSize);
  }, []);

  const handleChangeInput = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => setValue(value);

  useEffect(() => {
    if (!editModeFlag && content !== value) {
      handleChangeContent(value);
    }
  }, [editModeFlag]);

  return (
    <TextareaElement
      ref={ref}
      editMode={editModeFlag}
      name="video-label"
      onChange={handleChangeInput}
      value={value}
    ></TextareaElement>
  );
};

export default TextArea;
