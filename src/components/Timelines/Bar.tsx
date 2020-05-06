import React, {
  useRef,
  useEffect,
  useMemo,
  RefObject,
  useCallback,
} from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { changeToolTime } from 'store/actions/toolsActions';
import { IdType } from 'store/actions/types';
import transformable from 'components/Transformable';
import Moveable from 'moveable';
import { getComputedTranslateXY } from 'config/utils';

const TransformableControllerClass = 'TransformableControllerClass';

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  background-color: ${({ theme }) => theme.color.brand[0]};
  z-index: 10;
  overflow: hidden;
  &:active {
    cursor: grabbing;
    z-index: 10;
  }
  & ~ .${TransformableControllerClass} {
    z-index: 20;
    .moveable-control {
      width: 2px;
      height: 46px;
      margin-top: -23px;
      margin-left: 0px;
      border-radius: 0;
      border: 0;
      background-color: ${({ theme }) => theme.color.white[0]};

      &::after {
        content: '';
        position: absolute;
        width: 25px;
        height: 100%;
        transform: translate(-50%, 0px);
      }
    }
  }
`;

export interface BarProps {
  from?: number;
  to?: number;
  wrapperRef: RefObject<HTMLDivElement | null>;
  id: IdType;
  duration: number;
}

const Bar: React.SFC<BarProps> = ({
  from,
  to,
  duration,
  id,
  wrapperRef,
}) => {
  const dispatch = useDispatch();
  const barRef = useRef<HTMLDivElement>(null);
  const transformableRef = useRef<Moveable | null>(null);

  const [startPercent, endPercent] = useMemo(() => {
    if (from === undefined || to === undefined || !duration)
      return [null, null];

    return [
      Number(((from / duration) * 100).toFixed(2)),
      Number(((to / duration) * 100).toFixed(2)),
    ];
  }, [duration, from, to]);

  const updateTransformableCord = useCallback(() => {
    const tr = transformableRef.current;
    const wrapper = wrapperRef.current;
    if (!tr || !wrapper) return;

    const { offsetWidth, offsetHeight } = wrapper;
    tr.updateRect();
    tr.bounds = {
      left: 0,
      top: 0,
      right: offsetWidth,
      bottom: offsetHeight,
    };
  }, [wrapperRef]);
  const updateBarCords = useCallback(() => {
    const wrapper = wrapperRef.current;
    const bar = barRef.current;
    const transformable = transformableRef.current;
    if (
      !wrapper ||
      !bar ||
      !transformable ||
      endPercent === null ||
      startPercent === null
    )
      return;

    const { clientWidth } = wrapper;

    const widthPercent = endPercent - startPercent;
    const width = (clientWidth * widthPercent) / 100;
    const left = (clientWidth * startPercent) / 100;

    bar.style.width = width + 'px';
    bar.style.transform = `translate(${left}px,0px)`;
  }, [endPercent, startPercent, wrapperRef]);

  const calculateNewTime = useCallback(() => {
    const wrapper = wrapperRef.current;
    const bar = barRef.current;
    if (!wrapper || !bar) return;

    const { x } = getComputedTranslateXY(bar);
    const { clientWidth } = bar;
    const { offsetWidth } = wrapper;

    const widthPercent = (clientWidth / offsetWidth) * 100;
    const leftPercent = (x / offsetWidth) * 100;
    const from = Number(((duration * leftPercent) / 100).toFixed(2));
    const to = Number(
      ((duration * (leftPercent + widthPercent)) / 100).toFixed(2),
    );

    dispatch(changeToolTime(id, { from, to }));
  }, [dispatch, duration, id, wrapperRef]);

  useEffect(() => {
    //set default times (here i know duration)
    if (!duration) return;
    if (from === undefined || to === undefined) {
      const newTimeTo = Number((duration / 4).toFixed(2));
      dispatch(changeToolTime(id, { from: 0, to: newTimeTo }));
    }
  }, [duration, dispatch, from, to, id]);

  useEffect(() => {
    //Set draggable
    const bar = barRef.current;
    if (!bar) return;

    const sub = transformable(bar, {
      draggable: true,
      resizable: true,
      snappable: true,
      className: TransformableControllerClass,
      renderDirections: ['e', 'w'],
    })
      .on('resizeEnd', calculateNewTime)
      .on('dragEnd', calculateNewTime);

    transformableRef.current = sub;

    return () => {
      transformableRef.current = null;
      sub.destroy();
    };
  }, [calculateNewTime]);

  useEffect(() => {
    //update sizes
    const updateSizes = () => {
      updateBarCords();
      updateTransformableCord();
    };
    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, [updateBarCords, updateTransformableCord]);

  return <Wrapper ref={barRef}></Wrapper>;
};

export default Bar;
