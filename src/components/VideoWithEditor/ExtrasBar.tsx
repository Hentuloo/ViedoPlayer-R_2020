import React, { forwardRef } from 'react';
import styled from 'styled-components';

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
export interface ExtrasBarProps {}

const ExtrasBar = forwardRef(function ExtrasBar(
  props,
  ref?: React.Ref<HTMLButtonElement>,
) {
  return (
    <Wrapper {...props}>
      <ButtonWrapper>
        <Button ref={ref} onMouseUp={() => console.log('ZDX')}>
          Dodaj zakładkę
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
});

export default ExtrasBar;
