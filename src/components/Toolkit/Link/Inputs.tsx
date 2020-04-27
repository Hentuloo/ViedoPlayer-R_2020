import React from 'react';
import { IdType } from 'store/actions/types';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: grid;
  background-color: ${({ theme }) => theme.color.black[1]};
  overflow: scroll;
`;

export interface InputsProps {
  parentRef: React.RefObject<HTMLDivElement>;
  id: IdType;
  content: string;
  url: string;
  editMode?: boolean;
}

const Inputs: React.SFC<InputsProps> = () => {
  return <Wrapper>Label creator here(soon)</Wrapper>;
};

export default Inputs;
