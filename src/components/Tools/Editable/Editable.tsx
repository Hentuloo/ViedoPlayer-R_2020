import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import styled, { css } from 'styled-components';

import { useToolPosition } from '../utils/useToolPosition';
import Controllers from './Controllers';
import { getComputedTranslateXY } from 'config/utils';
import ToolWrapper from '../utils/Wrapper';
import { useDispatch } from 'react-redux';
import {
  changeToolCord,
  changeToolSize,
} from 'store/actions/toolsActions';
import { EditableToolComponent } from '../types';

import transformable from 'components/Transformable';
import Moveable, { OnResizeEnd, OnDragEnd } from 'moveable';

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

    ${({ editMode }) =>
      !editMode &&
      css`
        resize: none;
      `};

    ${({ editMode }) =>
      editMode &&
      css`
        cursor: auto;
        overflow: auto;
        resize: both;
      `};
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

  const handleChangeEditMode = (flag: boolean) => {
    setEditMode(flag);
  };

  const onDragEnd = useCallback(
    ({ target }: OnDragEnd) => {
      const { x, y } = getComputedTranslateXY(target);
      const { offsetWidth, offsetHeight } = parentRef as HTMLElement;
      const percentX = (x / offsetWidth) * 100;
      const percentY = (y / offsetHeight) * 100;
      dispatch(changeToolCord(id, { x: percentX, y: percentY }));
    },
    [dispatch, id, parentRef],
  );

  const onResizeEnd = useCallback(
    ({ target }: OnResizeEnd) => {
      const { clientWidth, clientHeight } = target;
      const { offsetWidth, offsetHeight } = parentRef as HTMLElement;
      const width = ((clientWidth / offsetWidth) * 100).toFixed(2);
      const height = ((clientHeight / offsetHeight) * 100).toFixed(2);
      dispatch(changeToolSize(id, Number(width), Number(height)));
    },
    [dispatch, id, parentRef],
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

    const sub = transformable(el, {
      resizable: true,
      rotatable: true,
      snappable: true,
    })
      .on('dragEnd', onDragEnd)
      .on('resizeEnd', onResizeEnd);

    moveableRef.current = sub;
    return () => sub.destroy();
  }, [editMode, onDragEnd, onResizeEnd, parentRef, ref]);

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
