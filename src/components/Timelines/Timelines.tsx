import React from 'react';
import styled from 'styled-components';
import Timeline from './Timeline';
import { LabelInterface } from 'components/LabelsPanel/types';
import { OnChangeCursorTimeWithId } from './types';

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
  labels: LabelInterface[];
  onChange: OnChangeCursorTimeWithId;
}

const Timelines: React.SFC<TimelinesProps> = ({
  duration,
  currentTime,
  labels,
  onChange,
}) => {
  const labelsTimes = JSON.stringify(labels.map(({ time }) => time));
  return (
    <Wrapper>
      {labels.map(({ id, time: { from, to }, content }) => (
        <Timeline
          key={id}
          duration={duration}
          content={content}
          from={from}
          to={to}
          onChange={(props) => onChange(id, props)}
        />
      ))}
      {labelsTimes}
    </Wrapper>
  );
};

export default Timelines;
