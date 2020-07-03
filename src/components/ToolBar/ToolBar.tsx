import React, { useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { addToolDraggable } from './addToolDraggable';
import { useDispatch } from 'react-redux';
import { toolsByTypes } from 'components/Toolkit/defaults';
import { ToolsNames } from 'components/Toolkit/types';
import { addTool } from 'store/actions/toolsActions';
import Input from './Input';

import { Button as LabelButton } from 'components/Toolkit/Label/Button';
import { Button as LinkButton } from 'components/Toolkit/Link/Button';

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
  z-index: 70;
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
  const linkRef = useRef<HTMLButtonElement>(null);

  const bindTool = useCallback(
    (
      ref: React.RefObject<HTMLButtonElement>,
      ToolName: ToolsNames,
    ) => {
      const tool = ref.current;
      if (!tool) return;
      return addToolDraggable(
        tool,
        {
          wrapper,
          width: toolsByTypes[ToolName].cord.width,
          height: toolsByTypes[ToolName].cord.height,
        },
        (x, y) => dispatch(addTool(ToolName, x, y)),
      );
    },
    [wrapper, dispatch],
  );

  useEffect(() => {
    const labelSub = bindTool(labelRef, ToolsNames.LABEL);
    const linkSub = bindTool(linkRef, ToolsNames.LINK);

    return () => {
      labelSub && labelSub.destroy();
      linkSub && linkSub.destroy();
    };
  }, [bindTool, linkRef, labelRef]);

  return (
    <Wrapper {...props}>
      <Input />
      <Tools>
        <LabelButton
          data-test-id="button_new-label-tool"
          ref={labelRef}
        />
        <LinkButton
          data-test-id="button_new-link-tool"
          ref={linkRef}
        />
      </Tools>
    </Wrapper>
  );
};

export default ToolBar;
