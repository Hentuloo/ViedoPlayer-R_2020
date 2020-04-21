import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { addToolDraggable } from './addToolDraggable';
import { Button as LabelButton } from 'components/Tools/Toolkit/Label/Button';
import { useDispatch } from 'react-redux';
import { toolsByTypes } from 'components/Tools/Toolkit/defaults';
import { ToolsNames } from 'components/Tools/Toolkit/types';
import { addTool } from 'store/actions/toolsActions';

const Wrapper = styled.aside``;

export interface ToolBarProps {
  wrapper: React.RefObject<HTMLElement>;
}

const ToolBar = ({ wrapper, ...props }: ToolBarProps) => {
  const dispatch = useDispatch();

  const labelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const label = labelRef.current;
    if (!label) return;

    const labelWidth = toolsByTypes[ToolsNames.LABEL].cord.width;
    const labelHeight = toolsByTypes[ToolsNames.LABEL].cord.height;

    const sub = addToolDraggable(
      label,
      {
        wrapper,
        width: labelWidth,
        height: labelHeight,
      },
      (x, y) => dispatch(addTool(ToolsNames.LABEL, x, y)),
    );

    return () => sub && sub.unsubscribe();
  }, []);

  return (
    <Wrapper {...props}>
      <LabelButton ref={labelRef} />
    </Wrapper>
  );
};

export default ToolBar;
