import React from 'react';
import styled from 'styled-components';
import { LabelStatic } from '../types';

const LabelContent = styled.div`
  display: grid;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  text-align: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.black[2]};
  color: ${({ theme }) => theme.color.brand[1]};
`;
export const Static: React.SFC<LabelStatic> = ({
  tool: {
    data: { content },
  },
}) => {
  return <LabelContent>{content}</LabelContent>;
};
