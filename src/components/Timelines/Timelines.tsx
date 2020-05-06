import React, { useRef, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';

import { getTimelinesAsArray } from 'store/selectors/toolsSelectors';
import { useSelector } from 'react-redux';
import TimelineElement from './TimelineElement';
import { buttonsWrapperWidth } from './config';
import gsap from 'gsap';

const TimeCursor = styled.div`
  position: absolute;
  width: 2px;
  height: 100%;
  left: calc(${buttonsWrapperWidth}px - 1px);
  background-color: ${({ theme }) => theme.color.black[3]};
  z-index: 50;
  opacity: 1;
  pointer-events: none;
`;

interface WrapperProps {
  scrollY: boolean;
}
const Wrapper = styled.div<WrapperProps>`
  position: relative;
  display: grid;
  max-height: 200px;

  width: calc(100% - 10%);
  align-content: flex-start;
  grid-row-gap: 10px;
  margin-left: 5%;
  margin-top: 50px;
  user-select: none;

  ${({ scrollY }) =>
    scrollY &&
    css`
      padding-right: 8px;
      overflow-y: scroll;
    `}
  /* ${({ theme }) => theme.mediaQuery.vlg} {
    height: 200px;
  } */
`;

export interface TimelinesProps {
  duration: number;
  currentTime: number;
}

const Timelines: React.SFC<TimelinesProps> = ({
  duration,
  currentTime,
  ...props
}) => {
  const timelines = useSelector(getTimelinesAsArray());
  const timeCursorRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const updateTimeCursorPosition = useCallback(() => {
    const bar = timeCursorRef.current;
    const wrapper = wrapperRef.current;
    if (!bar || !wrapper || currentTime === 0) return;

    const progressPercent = (currentTime / duration) * 100;
    const { clientWidth } = wrapper;
    const x =
      ((clientWidth - buttonsWrapperWidth) * progressPercent) / 100;

    gsap.to(bar, {
      duration: 0.3,
      x: x,
    });
  }, [currentTime, duration]);

  useEffect(() => {
    updateTimeCursorPosition();
    window.addEventListener('resize', updateTimeCursorPosition);
    return () =>
      window.removeEventListener('resize', updateTimeCursorPosition);
  }, [updateTimeCursorPosition]);

  return (
    <Wrapper
      ref={wrapperRef}
      scrollY={timelines.length >= 5}
      {...props}
    >
      <TimeCursor ref={timeCursorRef} />
      {timelines.reverse().map(({ id, from, data, to }) => (
        <TimelineElement
          key={id}
          id={id}
          duration={duration}
          from={from}
          content={data.content}
          to={to}
        />
      ))}
    </Wrapper>
  );
};

export default Timelines;
