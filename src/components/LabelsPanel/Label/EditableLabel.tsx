import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import LabelContent from './styles/LabelContent';
import { EditabLabelElementProps } from '../types';
import { useDraggable } from 'hooks/useDraggable/useDraggable';

import Controllers from './Controllers';
import LabelWrapper, {
  LabelWrapperCord,
} from './styles/LabelWrapper';
import { useLabelPrecentagePosition } from './useLabelPrecentagePosition';
import { mergeRefs } from 'config/utils';
import Textarea from './Textarea';

interface WrapperProps extends LabelWrapperCord {
  editMode?: boolean;
}

const StyledController = styled(Controllers)`
  opacity: 0;
  z-index: 10;
`;

export const Wrapper = styled.div<WrapperProps>`
  ${LabelWrapper}
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
    }
  }
`;

const StyledLabelContent = styled(LabelContent)`
  pointer-events: none;
  user-select: none;
`;

const Label: React.FC<EditabLabelElementProps> = ({
  label: { content, cord, id },
  events: { changeCord },
  parentRef,
  ...props
}) => {
  const changeCordCallback = (x: number, y: number) =>
    changeCord(id, { x, y });

  const {
    draggableRef,
    setFlag: setDraggableFlag,
    setOverlapElement,
  } = useDraggable(
    {
      defaultActive: true,
      detectOnlySourceNode: true,
      withOverlapElement: true,
    },
    changeCordCallback,
  );
  const ref = useLabelPrecentagePosition(cord, parentRef.current);
  const [editMode, setEditMode] = useState(false);

  const changeEditMode = (flag?: boolean) => {
    const currentFlag = flag !== undefined ? flag : !editMode;
    setEditMode(currentFlag);
    setDraggableFlag(!flag);
    if (!currentFlag) {
      alert('update text area text');
    }
  };

  useEffect(() => {
    parentRef.current && setOverlapElement(parentRef.current);
  }, []);

  return (
    <Wrapper
      ref={mergeRefs(ref, draggableRef)}
      editMode={editMode}
      {...props}
      size={{
        width: cord.width,
        height: cord.height,
      }}
    >
      <Textarea editMode={editMode} content={content} />
      {!editMode && (
        <StyledLabelContent>
          <span>{content}</span>
        </StyledLabelContent>
      )}
      <StyledController
        editMode={editMode}
        changeEditMode={changeEditMode}
      />
    </Wrapper>
  );
};

export default Label;
