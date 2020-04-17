import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import gsap from 'gsap';

interface WrapperProps {
  fromRight: boolean;
}

const RedBar = styled.div`
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
  width: 20px;
  cursor: e-resize;
  right: -10px;
  z-index: 5;

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

  ${({ fromRight }) =>
    fromRight &&
    css`
      right: auto;
      left: 0%;
      transform: translate(20%, 0px);
      ${StyledCursor} {
        rigth: auto;
        left: -10px;
      }
    `}
`;

export interface CursorProps {
  parentRef: React.RefObject<HTMLElement>;
  precents: number;
  fromRight?: boolean;
}

const Cursor: React.SFC<CursorProps> = ({
  fromRight = false,
  precents,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    gsap.set(wrapper, { x: `${precents}%` });
  }, []);

  return (
    <Wrapper ref={wrapperRef} fromRight={fromRight}>
      <StyledCursor></StyledCursor>
      <RedBar></RedBar>
    </Wrapper>
  );
};

export default Cursor;
