import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { addToolDraggable } from './addToolDraggable';
import { Button as LabelButton } from 'components/Tools/Toolkit/Label/Button';
import { useDispatch } from 'react-redux';
import { toolsByTypes } from 'components/Tools/Toolkit/defaults';
import { ToolsNames } from 'components/Tools/Toolkit/types';
import { addTool } from 'store/actions/toolsActions';
import Input from './Input';

const Wrapper = styled.aside`
  ${({ theme }) => theme.mediaQuery.md} {
    display: grid;
    grid-template-rows: auto 1fr;
    align-content: flex-start;
    grid-row-gap: 20px;
  }
`;
const Tools = styled.div`
  position: fixed;
  bottom: 0%;
  left: 0%;
  width: 100%;
  padding: 14px 0px;
  background-color: ${({ theme }) => theme.color.black[1]};
  align-self: flex-start;
  z-index: 20;
  ${({ theme }) => theme.mediaQuery.md} {
    position: relative;
    min-height: 60%;
  }
`;

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
  }, [wrapper]);

  return (
    <Wrapper {...props}>
      <Input />
      <Tools>
        <LabelButton ref={labelRef} />
      </Tools>
    </Wrapper>
  );
};

export default ToolBar;
