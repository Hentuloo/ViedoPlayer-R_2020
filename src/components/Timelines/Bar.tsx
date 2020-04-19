import React, { useRef } from 'react';
import styled from 'styled-components';

import Cursor from './Cursor';
import { OnChangeCursorTime } from './types';

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
  onChange: OnChangeCursorTime;
}

const Bar: React.SFC<BarProps> = ({
  from,
  to,
  duration,
  onChange,
}) => {
  const ref = useRef(null);

  const handleChangeCursor = (
    percents: number,
    fromRight?: boolean,
  ) => {
    const newTime = Number(((duration * percents) / 100).toFixed(2));
    fromRight
      ? onChange({ to: newTime })
      : onChange({ from: newTime });
  };

  const startPercent = Number(((from / duration) * 100).toFixed(2));
  const endPercent = Number(((to / duration) * 100).toFixed(2));

  return (
    <Wrapper ref={ref}>
      <Cursor
        parentRef={ref}
        onChange={handleChangeCursor}
        precents={startPercent}
      />
      <Cursor
        parentRef={ref}
        onChange={handleChangeCursor}
        precents={endPercent}
        fromRight
      />
    </Wrapper>
  );
};

export default Bar;
