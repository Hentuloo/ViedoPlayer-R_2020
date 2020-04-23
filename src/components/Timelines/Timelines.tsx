import React from 'react';
import styled, { css } from 'styled-components';
import Timeline from './Timeline';
import { getTimelinesAsArray } from 'store/selectors/toolsSelectors';
import { useSelector } from 'react-redux';

interface WrapperProps {
  scrollY: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  display: grid;
  max-height: 200px;
  width: calc(100% - 10% - 55px);
  align-content: flex-start;
  grid-row-gap: 10px;
  padding-top: 5px;
  margin-left: calc(55px + 5%);
  margin-top: 50px;
  user-select: none;

  ${({ scrollY }) =>
    scrollY &&
    css`
      width: calc(100% - 10% - 30px);
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
  currentTime,
  ...props
}) => {
  const timelines = useSelector(getTimelinesAsArray());
  return (
    <Wrapper scrollY={timelines.length >= 5} {...props}>
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
