import React from 'react';
import styled from 'styled-components';
import Textarea from './Textarea';

import { LabelEditable } from '../types';

const LabelContent = styled.div`
  display: grid;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  text-align: center;
  align-items: center;
  pointer-events: none;
  user-select: none;
  color: ${({ theme }) => theme.color.red[1]};
`;

export const Editable: React.FC<LabelEditable> = ({
  editMode,
  tool: {
    id,
    data: { content },
  },
  parentRef,
}) => {
  return (
    <>
      <Textarea
        parentRef={parentRef}
        id={id}
        content={content}
        editMode={editMode}
      />
      {!editMode && (
        <LabelContent>
          <span>{content}</span>
        </LabelContent>
      )}
    </>
  );
};
