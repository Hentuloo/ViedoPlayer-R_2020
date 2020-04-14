import React from 'react';
import styled from 'styled-components';

import EditableLabel from './Labels/EditableLabel';
import StaticLabel from './Labels/StaticLabel';
import { LabelInterface, LabelsEvents } from './Labels/types';
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
  return (
    <LabelsWrapper>
      {labels.map((label) =>
        labelsEvents ? (
          <EditableLabel
            key={label.id}
            events={labelsEvents}
            label={label}
          />
        ) : (
          <StaticLabel key={label.id} label={label} />
        ),
      )}
    </LabelsWrapper>
  );
};

export default Labels;
