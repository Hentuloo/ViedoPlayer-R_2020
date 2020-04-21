import React from 'react';
import styled from 'styled-components';
import Bar from './Bar';
import { IdType } from 'store/actions/types';

const Wrapper = styled.div`
  position: relative;
  grid-column: 2/-1;
  height: 40px;
  background-color: ${({ theme }) => theme.color.black[1]};
`;
const Title = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.color.white[0]};
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
  return (
    <Wrapper>
      <Title>{content}</Title>
      <Bar from={from} to={to} id={id} duration={duration}></Bar>
    </Wrapper>
  );
};

export default Timeline;
