import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';

import Cursor from './Cursor';

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  background-color: ${({ theme }) => theme.color.red[0]};
  z-index: 10;
  overflow: hidden;
`;

export interface BarProps {
  from: number;
  to: number;
  duration: number;
}

const Bar: React.SFC<BarProps> = ({ from, to, duration }) => {
  const ref = useRef(null);
  return (
    <Wrapper ref={ref}>
      <Cursor parentRef={ref} precents={30} />
      <Cursor parentRef={ref} fromRight={true} precents={50} />
    </Wrapper>
  );
};

export default Bar;
