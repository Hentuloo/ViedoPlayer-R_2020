import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import Cursor from './Cursor';
import { useDispatch } from 'react-redux';
import { changeToolTime } from 'store/actions/toolsActions';
import { IdType } from 'store/actions/types';

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  background-color: ${({ theme }) => theme.color.red[0]};
  z-index: 10;
  overflow: hidden;
`;

export interface BarProps {
  from?: number;
  to?: number;
  id: IdType;
  duration: number;
}

const Bar: React.SFC<BarProps> = ({ from, to, duration, id }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const handleChangeCursor = (
    percents: number,
    fromRight?: boolean,
  ) => {
    const newTime = Number(((duration * percents) / 100).toFixed(2));
    console.log(newTime);
    fromRight
      ? dispatch(changeToolTime(id, { to: newTime }))
      : dispatch(changeToolTime(id, { from: newTime }));
  };
  useEffect(() => {
    if (!duration) return;
    if (from === undefined || to === undefined) {
      const newTimeTo = Number((duration / 4).toFixed(2));
      dispatch(changeToolTime(id, { from: 0, to: newTimeTo }));
    }
  }, [duration, ref.current]);

  console.log(from, to);
  if (from === undefined || to === undefined) return null;
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
