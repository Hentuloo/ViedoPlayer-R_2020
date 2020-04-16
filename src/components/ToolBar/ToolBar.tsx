import React from 'react';
import styled from 'styled-components';
import { useTool, NewItemCallback } from './useTool';
import { defaultLabel } from 'components/VideoWithEditor/config';
import Label from './Tools/Label';

const Wrapper = styled.aside``;

export interface ToolBarProps {
  wrapper: React.RefObject<HTMLElement>;
  addLabel: NewItemCallback;
}

const ToolBar = ({ addLabel, wrapper, ...props }: ToolBarProps) => {
  const labelRef = useTool<HTMLButtonElement>(wrapper, addLabel, {
    width: defaultLabel.cord.width,
    height: defaultLabel.cord.height,
  });

  return (
    <Wrapper {...props}>
      <Label ref={labelRef} />
    </Wrapper>
  );
};

export default ToolBar;
