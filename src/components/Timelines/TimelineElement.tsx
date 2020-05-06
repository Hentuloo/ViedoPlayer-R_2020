import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Timeline from './Timeline';
import DeleteButton from './DeleteButton';
import { IdType } from 'store/actions/types';
import { buttonsWrapperWidth } from './config';
import gsap from 'gsap';
import { useDispatch } from 'react-redux';
import { changeToolTime } from 'store/actions/toolsActions';

const TimeCursor = styled.div`
  position: absolute;
  width: 2px;
  top: 0%;
  height: 100%;
  left: calc(${buttonsWrapperWidth}px + 1px);
  background-color: ${({ theme }) => theme.color.black[3]};
  z-index: 50;
  opacity: 1;
  pointer-events: none;
`;

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: ${buttonsWrapperWidth}px 1fr;
`;

export interface TimelineElementProps {
  key: IdType;
  id: IdType;
  duration: number;
  from: number | null;
  content: string;
  to: number | null;
  currentTime: number;
}

const TimelineElement: React.FC<TimelineElementProps> = ({
  duration,
  id,
  from,
  content,
  to,
  currentTime,
}) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timeCursorRef = useRef<HTMLDivElement>(null);

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
    //set default times
    if (!duration) return;
    if (typeof from !== 'number' || typeof to !== 'number') {
      dispatch(
        changeToolTime(id, { from: currentTime, to: duration }),
      );
    }
  }, [currentTime, dispatch, duration, from, id, to]);

  useEffect(() => {
    updateTimeCursorPosition();
    window.addEventListener('resize', updateTimeCursorPosition);
    return () =>
      window.removeEventListener('resize', updateTimeCursorPosition);
  }, [updateTimeCursorPosition]);

  return (
    <Wrapper ref={wrapperRef}>
      <DeleteButton toolId={id} content={content} />
      <Timeline
        key={id}
        duration={duration}
        content={content}
        id={id}
        from={from === null ? undefined : from}
        to={to === null ? undefined : to}
      />
      <TimeCursor ref={timeCursorRef} />
    </Wrapper>
  );
};

export default TimelineElement;
