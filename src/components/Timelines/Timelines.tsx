import React from 'react';
import styled, { css } from 'styled-components';
import Timeline from './Timeline';
import { getTimelinesAsArray } from 'store/selectors/getTimelinesAsArray';
import { useSelector } from 'react-redux';

interface WrapperProps {
  scrollY: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  grid-column: 1/-2;
  display: grid;
  height: 200px;
  align-content: flex-start;
  grid-template-columns: 1fr;
  grid-row-gap: 10px;
  padding-top: 5px;
  user-select: none;

  ${({ scrollY }) =>
    scrollY &&
    css`
      overflow-y: scroll;
    `}
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
  return (
    <Wrapper scrollY={timelines.length > 5} {...props}>
      {timelines.reverse().map(({ id, from, data, to }) => (
        <Timeline
          key={id}
          duration={duration}
          content={data.content}
          id={id}
          from={from === null ? undefined : from}
          to={to === null ? undefined : to}
        />
      ))}
    </Wrapper>
  );
};

export default Timelines;
