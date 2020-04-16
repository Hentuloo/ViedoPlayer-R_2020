import React from 'react';
import styled from 'styled-components';
import Timeline from './Timeline';

const Wrapper = styled.div`
  grid-column: 1/-2;
  display: grid;
  grid-template-columns: 55px 1fr;
  grid-row-gap: 10px;
  padding-top: 5px;
`;

export interface TimelinesProps {
  duration: number;
  currentTime: number;
}

const Timelines: React.SFC<TimelinesProps> = ({
  duration,
  currentTime,
}) => {
  return (
    <Wrapper>
      <Timeline
        duration={duration}
        content={'siema'}
        from={0.1}
        to={0.2}
      />
      <Timeline
        duration={duration}
        content={'to jest label'}
        from={0.2}
        to={0.4}
      />
    </Wrapper>
  );
};

export default Timelines;
