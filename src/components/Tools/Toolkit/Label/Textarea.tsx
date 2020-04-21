import React, { useRef, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { resizeCallback } from 'config/resizeCallback';
import { useDispatch } from 'react-redux';
import { changeToolSize } from 'store/actions/toolsActions';
import { IdType } from 'store/actions/types';
import { changeLabelToolContent } from 'store/actions/toolkitAction';

interface TextareaI {
  editMode?: boolean;
}

export const TextareaElement = styled.textarea<TextareaI>`
  position: relative;
  align-self: stretch;
  border: none;
  background-color: transparent;
  background-color: ${({ theme }) => theme.color.black[0]};
  color: ${({ theme }) => theme.color.white[0]};
  z-index: -1;
  opacity: 0;
  pointer-events: none;
  font-size: 1em;
  padding-top: 0.7em;

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
  id: IdType;
  content: string;
  editMode: boolean;
}

const TextArea: React.SFC<TextAreaProps> = ({
  parentRef,
  id,
  content,
  editMode,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>(content);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // On text area resize
    const el = ref.current;
    const parent = parentRef.current;
    if (!el || !parent) return;

    const sub = resizeCallback<HTMLTextAreaElement>(el, (w, h) => {
      const { offsetWidth, offsetHeight } = parent;
      //transform to percents by parent wrapper
      let width = Number(((w / offsetWidth) * 100).toFixed(2));
      let height = Number(((h / offsetHeight) * 100).toFixed(2));

      //set max size
      width = width >= 50 ? 50 : width;
      height = height >= 50 ? 50 : height;

      dispatch(changeToolSize(id, width, height));
    });
    if (!sub) return;
    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    // On page resize
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
    if (!editMode && content !== value) {
      dispatch(changeLabelToolContent(id, value));
    }
  }, [editMode]);

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
