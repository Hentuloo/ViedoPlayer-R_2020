import React, { forwardRef, Ref } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
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

const Label = forwardRef(function label(
  props,
  ref?: React.Ref<HTMLButtonElement>,
) {
  return (
    <Wrapper {...props}>
      <Button ref={ref}>Dodaj zakładkę</Button>
    </Wrapper>
  );
});

export default Label;
