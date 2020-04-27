import React, { forwardRef, Ref } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 80%;
  margin: 0px auto;
  background-color: ${({ theme }) => theme.color.black[2]};
  z-index: 10;
`;
const ButtonElement = styled.button`
  width: 100%;
  height: 60px;
  margin: 0px auto;
  border: none;
  background-color: ${({ theme }) => theme.color.black[2]};
  color: ${({ theme }) => theme.color.brand[1]};
  font-size: ${({ theme }) => theme.fs.s};
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export const Button = forwardRef(function label(
  props,
  ref?: React.Ref<HTMLButtonElement>,
) {
  return (
    <Wrapper {...props}>
      <ButtonElement ref={ref}>Dodaj zakładkę</ButtonElement>
    </Wrapper>
  );
});
