import React, { useRef, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import gsap from 'gsap';
import { getComputedTranslateXY } from 'config/utils';
import transformable from 'components/Transformable';
import { OnDrag, OnDragEnd } from 'moveable';

const GrayBar = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0%;
  top: 0%;
  background-color: ${({ theme }) => theme.color.black[2]};
`;

interface StyledCursorProps {
  fromRight: boolean;
  smallCursor: boolean;
}

const StyledCursor = styled.div<StyledCursorProps>`
  position: absolute;
  height: 100%;
  width: 70px;
  cursor: e-resize;
  right: -35px;
  z-index: 5;
  pointer-events: auto;

  &::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    background-color: ${({ theme }) => theme.color.white[1]};
    left: 50%;
    transform: translate(-50%, 0%);
    pointer-events: none;
  }

  ${({ smallCursor }) =>
    smallCursor &&
    css`
      width: 10px;
      right: -5px;
    `}

  ${({ fromRight, smallCursor }) =>
    fromRight &&
    css`
      right: auto;
      left: -35px;
      ${() =>
        smallCursor &&
        css`
          left: -5px;
        `}
    `}
`;

interface WrapperProps {
  fromRight: boolean;
}
const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  right: 100%;
  transform: translate(10%, 0px);
  pointer-events: none;

  &:active {
    z-index: 11;
  }
  ${({ fromRight }) =>
    fromRight &&
    css`
      right: auto;
      left: 0%;
      transform: translate(20%, 0px);
    `}
`;

export interface CursorProps {
  parentRef: React.RefObject<HTMLElement>;
  percents: number;
  maxPercents: number;
  fromRight?: boolean;
  onChange: (percents: number, fromRight?: boolean) => void;
}

const Cursor: React.SFC<CursorProps> = ({
  fromRight = false,
  onChange,
  percents,
  maxPercents,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const left = Number(
      ((wrapper.offsetWidth * percents) / 100).toFixed(2),
    );

    gsap.set(wrapper, { x: left });
  }, [percents]);

  const onDrag = useCallback(
    ({ target, translate }: OnDrag) => {
      const [x] = translate;
      const { clientWidth } = target;
      const percents = Number(((x / clientWidth) * 100).toFixed(2));
      // check if cursor is near second cursor
      if (fromRight && percents - 1 < maxPercents) return;
      if (!fromRight && percents + 1 > maxPercents) return;
      // check if cursor is in the ends
      if (percents < 0 || percents > 99.6) return;

      target.style.transform = `translateX(${x}px)`;
    },
    [fromRight, maxPercents],
  );

  const onDragEnd = useCallback(
    ({ target }: OnDragEnd) => {
      const { x } = getComputedTranslateXY(target);
      const { offsetWidth } = target as HTMLElement;
      const dividend = Number(
        ((Math.abs(x) / offsetWidth) * 100).toFixed(2),
      );
      onChange(dividend, fromRight);
    },
    [fromRight, onChange],
  );

  useEffect(() => {
    //Set draggable
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const sub = transformable(wrapper, { draggable: true })
      //disable default draggable
      .off('drag')
      //set my own draggable
      .on('drag', onDrag)
      .on('dragEnd', onDragEnd);

    return () => sub.destroy();
  }, [onDrag, onDragEnd]);

  return (
    <Wrapper ref={wrapperRef} fromRight={fromRight}>
      <StyledCursor
        fromRight={fromRight}
        smallCursor={Math.abs(percents - maxPercents) < 5}
      ></StyledCursor>
      <GrayBar></GrayBar>
    </Wrapper>
  );
};

export default Cursor;
