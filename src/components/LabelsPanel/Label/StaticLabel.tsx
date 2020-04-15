import React from 'react';
import styled from 'styled-components';

import LabelContent from './styles/LabelContent';
import { LabelElementProps } from '../types';
import LabelWrapper from './styles/LabelWrapper';

import { useLabelPrecentagePosition } from './useLabelPrecentagePosition';

export const Wrapper = styled.div`
  ${LabelWrapper}
  pointer-events: all;
`;

const Label: React.FC<LabelElementProps> = ({
  label: { content, cord },
  parentRef,
  ...props
}) => {
  const ref = useLabelPrecentagePosition<HTMLDivElement>(
    cord,
    parentRef.current,
  );

  return (
    <Wrapper
      ref={ref}
      {...props}
      size={{
        width: cord.width,
        height: cord.height,
      }}
    >
      <LabelContent>
        <span>{content}</span>
      </LabelContent>
    </Wrapper>
  );
};

export default Label;
