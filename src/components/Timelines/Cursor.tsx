import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import gsap from 'gsap';
import draggable from 'components/draggable/draggable';

interface WrapperProps {
  fromRight: boolean;
}

const GrayBar = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0%;
  top: 0%;
  background-color: ${({ theme }) => theme.color.gray[0]};
`;
const StyledCursor = styled.div`
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
    background-color: ${({ theme }) => theme.color.black[0]};
    left: 50%;
    transform: translate(-50%, 0%);
    pointer-events: none;
  }
`;

const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: green;
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
      ${StyledCursor} {
        rigth: auto;
        left: -35px;
      }
    `}
`;

export interface CursorProps {
  parentRef: React.RefObject<HTMLElement>;
  precents: number;
  fromRight?: boolean;

  onChange: (precents: number, fromRight?: boolean) => void;
}

const Cursor: React.SFC<CursorProps> = ({
  fromRight = false,
  onChange,
  precents,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const left = (wrapper.offsetWidth * precents) / 100;
    gsap.set(wrapper, { x: left });
  }, [precents]);

  useEffect(() => {
    //Set draggable and on-change callback
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const sub = draggable(wrapper, {
      axisY: false,
      subscribe: ({ left, width }) => {
        const precents = Number(((left / width) * 100).toFixed(2));
        if (precents < 0 || precents > 99.6) return;

        gsap.set(wrapper, { x: left });
      },
      onDrop: () => {
        const { left } = wrapper.getBoundingClientRect();

        const dividend = ((left - 50) / wrapper.offsetWidth) * 100;
        const precent = Number(
          Math.abs(Math.floor(dividend)).toFixed(0),
        );

        onChange(fromRight ? precent : 100 - precent, fromRight);
      },
    });

    return () => sub.unsubscribe();
  }, []);

  return (
    <Wrapper ref={wrapperRef} fromRight={fromRight}>
      <StyledCursor></StyledCursor>
      <GrayBar></GrayBar>
    </Wrapper>
  );
};

export default Cursor;
