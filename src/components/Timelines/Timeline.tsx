import React, { useRef, memo } from 'react';
import styled from 'styled-components';
import Bar from './Bar';
import { IdType } from 'store/actions/types';

const Wrapper = styled.div`
  position: relative;
  width: 99%;
  height: 40px;
  background-color: ${({ theme }) => theme.color.black[2]};
  overflow: hidden;

  ${({ theme }) => theme.mediaQuery.md} {
    width: 100%;
  }
`;
const Title = styled.div`
  position: absolute;
  max-width: 85%;
  max-height: 50%;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 50%);
  color: ${({ theme }) => theme.color.white[1]};
  z-index: 20;
  overflow: hidden;
  pointer-events: none;
  opacity: 0.5;
  letter-spacing: 4px;
  line-height: 20px;
  font-size: ${({ theme }) => theme.fs.s};
  font-weight: ${({ theme }) => theme.fw[0]};
`;

export interface TimelineProps {
  content: string;
  from?: number;
  to?: number;
  id: IdType;
  duration: number;
}

const Timeline: React.SFC<TimelineProps> = ({
  content,
  from,
  to,
  id,
  duration,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Wrapper ref={ref}>
      <Title>{content.slice(0, 16)}</Title>
      <Bar
        wrapperRef={ref}
        from={from}
        to={to}
        id={id}
        duration={duration}
      ></Bar>
    </Wrapper>
  );
};

export default memo(Timeline);
