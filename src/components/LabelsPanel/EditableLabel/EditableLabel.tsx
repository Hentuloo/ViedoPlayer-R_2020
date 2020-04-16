import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDraggable } from 'hooks/useDraggable/useDraggable';
import { useLabelPrecentagePosition } from '../useLabelPrecentagePosition';

import Controllers from './Controllers';
import LabelContent from '../styles/LabelContent';
import LabelWrapper, {
  LabelWrapperCord,
} from '../styles/LabelWrapper';
import Textarea from './Textarea';
import { mergeRefs } from 'config/utils';
import { EditabLabelElementProps } from '../types';

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
  events: { changeCord, changeLabelSize },
  parentRef,
  ...props
}) => {
  const changeCordCallback = (x: number, y: number) =>
    changeCord(id, { x, y });

  const {
    draggableRef,
    setFlag: setDraggableFlag,
    setOverlapElement,
  } = useDraggable<HTMLDivElement>(
    {
      defaultActive: true,
      detectOnlySourceNode: true,
      withOverlapElement: true,
    },
    changeCordCallback,
  );

  const ref = useLabelPrecentagePosition<HTMLDivElement>(
    cord,
    parentRef.current,
  );
  const [editMode, setEditMode] = useState(false);

  const changeEditMode = (flag?: boolean) => {
    const currentFlag = flag !== undefined ? flag : !editMode;
    setEditMode(currentFlag);
    setDraggableFlag(!flag);
    if (!currentFlag) {
      alert('update text area text');
    }
  };
  const handleChangeSize = (width: number, height: number) =>
    changeLabelSize(id, width, height);

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
      <Textarea
        editMode={editMode}
        content={content}
        onChangeSize={handleChangeSize}
      />
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
