import React from 'react';
import styled from 'styled-components';
import { useTool, NewItemCallback } from './useTool';

const Wrapper = styled.aside``;
const ButtonWrapper = styled.div`
  width: 80%;
  margin: 0px auto;
  background-color: ${({ theme }) => theme.color.black[1]};
`;
const Button = styled.button`
  width: 100%;
  height: 70px;
  margin: 0px auto;
  border: none;
  background-color: ${({ theme }) => theme.color.black[0]};
  color: ${({ theme }) => theme.color.red[1]};
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;
export interface ToolBarProps {
  wrapper: React.RefObject<HTMLElement>;
  addLabel: NewItemCallback;
}

const ToolBar = ({ addLabel, wrapper, ...props }: ToolBarProps) => {
  const [labelRef] = useTool(wrapper, addLabel);

  return (
    <Wrapper {...props}>
      <ButtonWrapper>
        <Button ref={labelRef}>Dodaj zakładkę</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default ToolBar;
