import React from 'react';
import styled from 'styled-components';

import LabelContent from '../styles/LabelContent';
import { LabelProps } from './types';

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  max-width: 35%;
  max-height: 25%;
  background-color: ${({ theme }) => theme.color.black[0]};
  pointer-events: all;
`;

const Label: React.FC<LabelProps> = ({
  label: { content },
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <LabelContent>
        <span>{content}</span>
      </LabelContent>
    </Wrapper>
  );
};

export default Label;
