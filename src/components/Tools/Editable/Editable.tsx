import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import styled from 'styled-components';

import { useToolPosition } from '../utils/useToolPosition';
import Controllers from './Controllers';
import { getComputedTranslateXY } from 'config/utils';
import ToolWrapper from '../utils/Wrapper';
import { useDispatch } from 'react-redux';
import {
  changeToolSize,
  changeToolRotation,
} from 'store/actions/toolsActions';
import { EditableToolComponent } from '../types';

import Moveable, { OnRotateEnd } from 'moveable';
import { progressBarHeight } from 'components/Video/config';
import { CustomMoveable } from 'components/CustomMoveable';

const StyledController = styled(Controllers)`
  opacity: 1;
  z-index: 10;
  font-size: 1em;
  ${({ theme }) => theme.mediaQuery.md} {
    opacity: 0;
  }
`;
interface WrapperInterface {
  editMode: boolean;
}

export const StyledWrapper = styled(ToolWrapper)<WrapperInterface>`
  pointer-events: all;
  user-select: none;
  cursor: grab;

  &:active {
    cursor: grabbing;
    z-index: 10;
  }

  &:hover {
    ${StyledController} {
      opacity: 1;
      transition: opacity 0.4s ease;
    }
  }
`;

const EditableLabelWrapper: React.SFC<EditableToolComponent> = ({
  parentRef: { current: parentRef },
  tool,
  render,
  ...props
}) => {
  const moveableRef = useRef<Moveable | null>(null);
  const { cord, id } = tool;
  const dispatch = useDispatch();
  const ref = useToolPosition<HTMLDivElement>(cord, parentRef);
  const [editMode, setEditMode] = useState(false);

  const handleChangeEditMode = useCallback((flag: boolean) => {
    setEditMode(flag);
  }, []);

  const caculateNewCords = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const { x, y } = getComputedTranslateXY(el);

    const { clientWidth, clientHeight } = el;
    const { offsetWidth, offsetHeight } = parentRef as HTMLElement;
    const width = Number(
      ((clientWidth / offsetWidth) * 100).toFixed(2),
    );
    const height = Number(
      ((clientHeight / offsetHeight) * 100).toFixed(2),
    );
    const left = Number(((x / offsetWidth) * 100).toFixed(2));
    const top = Number(
      ((y / (offsetHeight + progressBarHeight / 2)) * 100).toFixed(2),
    );
    const cords = {
      width: width,
      height: height,
      left,
      top,
    };
    dispatch(changeToolSize(id, cords));
  }, [dispatch, id, parentRef, ref]);

  const onRotateEnd = useCallback(
    ({ target }: OnRotateEnd) => {
      const { z } = getComputedTranslateXY(target);
      dispatch(changeToolRotation(id, z));
    },
    [dispatch, id],
  );

  const updateMobeableCord = useCallback(() => {
    const moveable = moveableRef.current;

    if (!moveable) return;
    const { offsetWidth, offsetHeight } = parentRef as HTMLElement;
    moveable.updateRect();
    moveable.bounds = {
      left: 0,
      top: 0,
      right: offsetWidth,
      bottom: offsetHeight,
    };
  }, [parentRef]);

  useEffect(() => {
    // On page resize set new max size
    const el = ref.current;
    if (!el || !parentRef) return;

    const setMaxSize = () => {
      const { offsetWidth, offsetHeight } = parentRef as HTMLElement;
      el.style.maxWidth = `${(offsetWidth / 2).toFixed(2)}px `;
      el.style.maxHeight = `${(offsetHeight / 2).toFixed(2)}px`;
      updateMobeableCord();
    };
    setMaxSize();

    window.addEventListener('resize', setMaxSize);
    return () => window.removeEventListener('resize', setMaxSize);
  }, [ref, parentRef, updateMobeableCord]);

  useEffect(() => {
    // connect with transformable
    const el = ref.current;
    if (!el || !parentRef || editMode === true) return;

    const sub = CustomMoveable.createWithEvents(el, {})
      .on('dragEnd', caculateNewCords)
      .on('resizeEnd', caculateNewCords)
      .on('rotateEnd', onRotateEnd);

    moveableRef.current = sub;
    updateMobeableCord();
    return () => {
      sub.destroy();
      moveableRef.current = null;
    };
  }, [
    caculateNewCords,
    editMode,
    onRotateEnd,
    parentRef,
    ref,
    updateMobeableCord,
  ]);

  useEffect(() => {
    updateMobeableCord();
  }, [updateMobeableCord]);

  return (
    <StyledWrapper ref={ref} {...props} editMode={editMode}>
      {render(editMode, handleChangeEditMode)}
      <StyledController
        editMode={editMode}
        onChange={handleChangeEditMode}
      />
    </StyledWrapper>
  );
};

export default EditableLabelWrapper;
