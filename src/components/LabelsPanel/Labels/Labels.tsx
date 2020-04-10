import React from 'react';
import styled from 'styled-components';

import EditableLabel from './EditableLabel';
import StaticLabel from './StaticLabel';

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

const labels = [
  {
    id: 1,
    cord: { left: 100, top: 40, width: 60, height: 80 },
    content: 'Zajebisty label siema',
    timeline: { from: 0.2, to: 0.3 },
  },
];

export interface LabelsProps {
  editable?: boolean;
}

const Labels: React.SFC<LabelsProps> = ({ editable = false }) => {
  return (
    <LabelsWrapper>
      {labels.map((label) =>
        editable ? (
          <EditableLabel key={label.id} label={label} />
        ) : (
          <StaticLabel key={label.id} label={label} />
        ),
      )}
    </LabelsWrapper>
  );
};

export default Labels;
