import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import gsap from 'gsap';
import draggable from 'components/draggable/draggable';
import { getComputedTranslateXY } from 'config/utils';

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

  useEffect(() => {
    //Set draggable and on-change callback
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const sub = draggable(wrapper, {
      axisY: false,
      subscribe: ({ left, width }) => {
        const percents = Number(((left / width) * 100).toFixed(2));
        // check if cursor is near second cursor
        if (fromRight && percents - 1 < maxPercents) return;
        if (!fromRight && percents + 1 > maxPercents) return;
        // check if cursor is in the end
        if (percents < 0 || percents > 99.6) return;

        gsap.set(wrapper, { x: left });
      },
      onDrop: () => {
        const { x } = getComputedTranslateXY(wrapper);
        const dividend = Number(
          ((Math.abs(x) / wrapper.offsetWidth) * 100).toFixed(2),
        );
        onChange(dividend, fromRight);
      },
    });

    return () => sub.unsubscribe();
  }, [maxPercents]);

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
