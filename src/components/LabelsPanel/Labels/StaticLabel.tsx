import React from 'react';
import styled from 'styled-components';

import LabelContent from '../styles/LabelContent';
import { LabelProps } from './types';
import LabelWrapper from '../styles/LabelWrapper';

export const Wrapper = styled.div`
  ${LabelWrapper}
  pointer-events: all;
`;

const Label: React.FC<LabelProps> = ({
  label: { content, cord },
  ...props
}) => {
  return (
    <Wrapper {...props} {...cord}>
      <LabelContent>
        <span>{content}</span>
      </LabelContent>
    </Wrapper>
  );
};

export default Label;
