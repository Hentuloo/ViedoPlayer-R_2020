import React, { useRef, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { IdType } from 'store/actions/types';
import { changeLabelToolContent } from 'store/actions/toolkitAction';

interface TextareaI {
  editMode?: boolean;
}

export const TextareaElement = styled.textarea<TextareaI>`
  position: relative;
  max-width: 100%;
  max-height: 100%;
  align-self: stretch;
  border: none;
  background-color: transparent;
  background-color: ${({ theme }) => theme.color.black[0]};
  color: ${({ theme }) => theme.color.white[0]};
  z-index: -1;

  font-size: 1em;
  padding-top: 0.7em;
  padding-right: 0.2em;
  resize: none;

  ${({ editMode }) =>
    !editMode &&
    css`
      opacity: 0;
      pointer-events: none;
    `};

  ${({ editMode }) =>
    editMode &&
    css`
      cursor: auto;
      overflow: auto;
      resize: both;
    `};
`;

export interface TextAreaProps {
  parentRef: React.RefObject<HTMLDivElement>;
  id: IdType;
  content: string;
  editMode: boolean;
}

const TextArea: React.SFC<TextAreaProps> = ({
  id,
  content,
  editMode,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>(content);
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleChangeInput = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => setValue(value);

  useEffect(() => {
    if (!editMode && content !== value) {
      dispatch(changeLabelToolContent(id, value));
    }
  }, [editMode, content, dispatch, id, value]);

  return (
    <TextareaElement
      ref={ref}
      editMode={editMode}
      name="video-label"
      onChange={handleChangeInput}
      value={value}
    ></TextareaElement>
  );
};

export default TextArea;
