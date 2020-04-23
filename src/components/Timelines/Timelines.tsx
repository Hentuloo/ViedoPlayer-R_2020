import React from 'react';
import styled, { css } from 'styled-components';

import { getTimelinesAsArray } from 'store/selectors/toolsSelectors';
import { useSelector } from 'react-redux';
import TimelineElement from './TimelineElement';

interface WrapperProps {
  scrollY: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  display: grid;
  max-height: 200px;

  width: calc(100% - 10%);
  align-content: flex-start;
  grid-row-gap: 10px;
  padding-top: 5px;
  margin-left: 5%;
  margin-top: 50px;
  user-select: none;

  ${({ scrollY }) =>
    scrollY &&
    css`
      padding-right: 8px;
      overflow-y: scroll;
    `}
  ${({ theme }) => theme.mediaQuery.vlg} {
    height: 200px;
  }
`;

export interface TimelinesProps {
  duration: number;
  currentTime: number;
}

const Timelines: React.SFC<TimelinesProps> = ({
  duration,
  ...props
}) => {
  const timelines = useSelector(getTimelinesAsArray());
  return (
    <Wrapper scrollY={timelines.length >= 5} {...props}>
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
