import React, { useRef } from 'react';
import styled from 'styled-components';

import EditableLabel from './EditableLabel/EditableLabel';
import StaticLabel from './StaticLabel/StaticLabel';
import { LabelInterface, LabelsEvents } from './types';
export const Wrapper = styled.div`
  position: relative;
`;
export const LabelsWrapper = styled.div`
  position: absolute;
  left: 0%;
  top: 0%;
  width: 100%;
  height: calc(100% - 40px);
  pointer-events: none;
`;

export interface LabelsProps {
  labelsEvents?: LabelsEvents;
  labels?: LabelInterface[];
}

const Labels: React.SFC<LabelsProps> = ({
  labelsEvents,
  labels = [],
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  return (
    <LabelsWrapper ref={wrapperRef}>
      {labels.map((label) =>
        labelsEvents ? (
          <EditableLabel
            key={label.id}
            events={labelsEvents}
            label={label}
            parentRef={wrapperRef}
          />
        ) : (
          <StaticLabel
            key={label.id}
            label={label}
            parentRef={wrapperRef}
          />
        ),
      )}
    </LabelsWrapper>
  );
};

export default Labels;
