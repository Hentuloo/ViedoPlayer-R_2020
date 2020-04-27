import React, { forwardRef, Ref } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 80%;
  margin: 0px auto;
  z-index: 10;
`;
const ButtonElement = styled.button`
  width: 100%;
  height: 60px;
  margin: 0px auto;
  border: none;
  font-size: ${({ theme }) => theme.fs.s};
  color: ${({ theme }) => theme.color.white[1]};
  background-color: transparent;
  cursor: grab;
  text-decoration: underline;

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
      <ButtonElement ref={ref}>Dodaj Link</ButtonElement>
    </Wrapper>
  );
});
