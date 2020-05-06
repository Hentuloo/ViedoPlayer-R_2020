import React from 'react';
import styled from 'styled-components';
import Timeline from './Timeline';
import DeleteButton from './DeleteButton';
import { IdType } from 'store/actions/types';
import { buttonsWrapperWidth } from './config';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${buttonsWrapperWidth}px 1fr;
`;

export interface TimelineElementProps {
  key: IdType;
  id: IdType;
  duration: number;
  from: number | null;
  content: string;
  to: number | null;
}

const TimelineElement: React.FC<TimelineElementProps> = ({
  duration,
  id,
  from,
  content,
  to,
}) => {
  return (
    <Wrapper>
      <DeleteButton toolId={id} content={content} />
      <Timeline
        key={id}
        duration={duration}
        content={content}
        id={id}
        from={from === null ? undefined : from}
        to={to === null ? undefined : to}
      />
    </Wrapper>
  );
};

export default TimelineElement;
