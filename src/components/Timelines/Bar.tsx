import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';
import { dragAndDrop } from 'hooks/useDraggable/dragAndDrop';
import { useDraggable } from 'hooks/useDraggable/useDraggable';

const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  left: 0%;
  top: 0%;
  background-color: ${({ theme }) => theme.color.red[0]};
  z-index: 10;
`;
const cursor = css`
  position: absolute;
  height: 100%;
  width: 3px;
  cursor: e-resize;
  padding: 0px 11px;

  &::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    background-color: ${({ theme }) => theme.color.black[0]};
    left: 50%;
    transform: translate(-50%, 0%);
  }
`;
const LeftCursor = styled.div`
  ${cursor};
  left: 0%;
  transform: translate(-50%, 0%);
`;
const RightCursor = styled.div`
  ${cursor};
  right: 0;
  transform: translate(50%, 0%);
`;

export interface BarProps {
  from: number;
  to: number;
  duration: number;
}

const Bar: React.SFC<BarProps> = ({ from, to, duration }) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    draggableRef: leftCursor,
    setOverlapElement: setLeftCursorParent,
  } = useDraggable<HTMLDivElement>({ withOverlapElement: true });
  const {
    draggableRef: rightCursor,
    setOverlapElement: setRightCursorParent,
  } = useDraggable<HTMLDivElement>({ withOverlapElement: true });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentNode as HTMLElement;
    console.log(parent.offsetWidth);
    setRightCursorParent(parent);
    setLeftCursorParent(parent);
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const start = Number(((from / duration) * 100).toFixed(2));
    const end = Number(((to - from / duration) * 100).toFixed(2));

    gsap.set(ref.current, {
      left: `${start}%`,
      right: `${end + start}%`,
    });
  }, [duration]);

  return (
    <>
      <Wrapper ref={ref}>
        <LeftCursor ref={leftCursor}></LeftCursor>
        <RightCursor ref={rightCursor}></RightCursor>
      </Wrapper>
    </>
  );
};

export default Bar;
