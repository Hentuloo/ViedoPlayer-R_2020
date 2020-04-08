import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';

export const TooltipTime = styled.div`
  position: absolute;
  bottom: 110%;
  left: 0%;
  padding: 4px 6px;
  background-color: ${({ theme }) => theme.color.black[1]};
  color: ${({ theme }) => theme.color.white[0]};
  transform: translate(10px, 0px);
`;
export const Wrapper = styled.div`
  position: relative;
  min-height: 3px;
`;
export const BarWrapper = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.black[1]};
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
}

const ProgressBar: React.SFC<ProgressBarProps> = ({
  currentTime,
  duration,
  ...props
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref || currentTime === 0) return;
    const progressPrecent = 100 - (currentTime / duration) * 100;

    gsap.to(ref.current, {
      duration: 0.3,
      x: `-${progressPrecent}%`,
    });
  }, [currentTime]);

  return (
    <Wrapper {...props}>
      <BarWrapper>
        <Bar ref={ref} />
      </BarWrapper>

      <TooltipTime>3:35</TooltipTime>
    </Wrapper>
  );
};

export default ProgressBar;
