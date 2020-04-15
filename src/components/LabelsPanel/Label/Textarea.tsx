import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { fromEvent } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';

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
type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};
type MouseEvent = HTMLElementEvent<HTMLTextAreaElement>;

export interface TextAreaProps {
  editMode: boolean;
  content: string;
}

const TextArea: React.SFC<TextAreaProps> = ({
  editMode,
  content,
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const donw$ = fromEvent<MouseEvent>(el, 'mousedown');
    const up$ = fromEvent<MouseEvent>(el, 'mouseup');

    const resize$ = donw$.pipe(
      map(({ target }) => [target.offsetWidth, target.offsetHeight]),
      switchMap(([width, height]) =>
        up$.pipe(
          filter(
            ({ target: { offsetWidth, offsetHeight } }) =>
              offsetWidth !== width || offsetHeight !== height,
          ),
        ),
      ),
    );

    const resizeSub = resize$.subscribe(() => alert('resize'));

    return () => {
      resizeSub.unsubscribe();
    };
  }, []);

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
