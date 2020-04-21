import React from 'react';
import styled from 'styled-components';
import Timeline from './Timeline';
import { getTimelinesAsArray } from 'store/selectors/getTimelinesAsArray';
import { useSelector } from 'react-redux';

const Wrapper = styled.div`
  grid-column: 1/-2;
  display: grid;
  grid-template-columns: 55px 1fr;
  grid-row-gap: 10px;
  padding-top: 5px;
  user-select: none;
`;

export interface TimelinesProps {
  duration: number;
  currentTime: number;
}

const Timelines: React.SFC<TimelinesProps> = ({
  duration,
  currentTime,
}) => {
  const timelines = useSelector(getTimelinesAsArray());
  return (
    <Wrapper>
      {timelines.map(({ id, from, data, to }) => (
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
