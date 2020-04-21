import React, { forwardRef, Ref } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 80%;
  margin: 0px auto;
  background-color: ${({ theme }) => theme.color.black[1]};
  z-index: 10;
`;
const ButtonElement = styled.button`
  width: 100%;
  height: 70px;
  margin: 0px auto;
  border: none;
  background-color: ${({ theme }) => theme.color.black[0]};
  color: ${({ theme }) => theme.color.red[1]};
  cursor: grab;
  font-size: ${({ theme }) => theme.fs.s};

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
