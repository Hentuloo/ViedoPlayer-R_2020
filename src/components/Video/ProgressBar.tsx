import React, { useRef, useEffect, memo, useCallback } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';

export const TooltipTime = styled.div`
  position: absolute;
  bottom: 110%;
  left: 0%;
  padding: 4px 6px;
  background-color: ${({ theme }) => theme.color.black[2]};
  color: ${({ theme }) => theme.color.white[0]};
  transform: translate(10px, 0px);
  opacity: 0;
  pointer-events: none;
`;
export const Wrapper = styled.div`
  position: relative;
  min-height: 3px;
  cursor: pointer;
  &:hover {
    ${TooltipTime} {
      opacity: 1;
    }
  }
`;
export const BarWrapper = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  height: 100%;
  overflow: hidden;

  pointer-events: none;
`;
export const Bar = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0%;
  top: 0%;
  background-color: ${({ theme }) => theme.color.brand[1]};
  transform: translate(-100%, 0px);
`;

export interface ProgressBarProps {
  currentTime: number;
  duration: number;
  setNewTime: (time: number) => void;
}

const ProgressBar: React.SFC<ProgressBarProps> = ({
  currentTime,
  duration,
  setNewTime,
  ...props
}) => {
  const barRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const getBarTime = useCallback(
    (offsetX: number): number | string => {
      if (!wrapperRef.current) return 0;
      const barWidth = wrapperRef.current.clientWidth;

      const percent = (offsetX / barWidth) * 100;
      const time = ((duration * percent) / 100).toFixed(2);

      return time;
    },
    [duration],
  );

  useEffect(() => {
    if (!barRef || currentTime === 0) return;
    const progressPercent = 100 - (currentTime / duration) * 100;

    gsap.to(barRef.current, {
      duration: 0.3,
      x: `-${progressPercent}%`,
    });
  }, [currentTime, duration]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const tolltip = tooltipRef.current;
    if (!wrapper || !tolltip || !duration) return;

    const handleBarMove = ({ offsetX }: MouseEvent) => {
      //move
      gsap.set(tolltip, { x: offsetX - tolltip.clientWidth / 2 });
      //set time
      const time = getBarTime(offsetX);
      tolltip.innerText = time.toString().replace('.', ':');
    };

    wrapper.addEventListener('mousemove', handleBarMove);

    return () => {
      if (!wrapper) return;
      wrapper.removeEventListener('mousemove', handleBarMove);
    };
  }, [duration, getBarTime]);

  const handleSetNewTime = (e: React.MouseEvent) => {
    if (!tooltipRef.current) return;
    setNewTime(Number(getBarTime(e.nativeEvent.offsetX)));
  };

  return (
    <Wrapper ref={wrapperRef} {...props} onClick={handleSetNewTime}>
      <BarWrapper>
        <Bar ref={barRef} />
      </BarWrapper>
      <TooltipTime ref={tooltipRef}>0:00</TooltipTime>
    </Wrapper>
  );
};

export const MemomizedProgressBar = memo(
  ProgressBar,
  (prev, next) =>
    prev.currentTime === next.currentTime &&
    prev.duration === next.duration,
);

export default ProgressBar;
