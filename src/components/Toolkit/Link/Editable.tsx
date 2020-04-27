import React from 'react';
import styled from 'styled-components';
import Inputs from './Inputs';
import { LinkEditable } from '../types';

const Link = styled.a`
  position: absolute;
  display: grid;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  text-align: center;
  align-items: center;
  pointer-events: none;
  user-select: none;
  color: ${({ theme }) => theme.color.white[1]};
  background-color: ${({ theme }) => theme.color.black[1]};
`;

export const Editable: React.FC<LinkEditable> = ({
  editMode,
  tool: {
    id,
    data: { content, url },
  },
  parentRef,
}) => {
  if (editMode) {
    return (
      <Inputs
        parentRef={parentRef}
        id={id}
        content={content}
        url={url}
        editMode={editMode}
      />
    );
  }
  return <Link href={url}>{content}</Link>;
};
