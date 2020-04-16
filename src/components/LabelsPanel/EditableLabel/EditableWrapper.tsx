import React, { useEffect, useContext } from 'react';
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
import Context from './Context';

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

export interface EditableWrapperProps {
  parentRef: React.RefObject<HTMLDivElement>;
}

const EditableLabelWrapper: React.SFC<EditableWrapperProps> = ({
  parentRef,
  ...props
}) => {
  const {
    label: { content, cord },
    editModeFlag,
    handleChangeLabelCord,
  } = useContext(Context);

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
    handleChangeLabelCord,
  );

  const ref = useLabelPrecentagePosition<HTMLDivElement>(
    cord,
    parentRef.current,
  );
  useEffect(() => {
    parentRef.current && setOverlapElement(parentRef.current);
  }, []);

  return (
    <Wrapper
      ref={mergeRefs(ref, draggableRef)}
      editMode={editModeFlag}
      {...props}
      size={{
        width: cord.width,
        height: cord.height,
      }}
    >
      <Textarea parentRef={parentRef} />
      {!editModeFlag && (
        <StyledLabelContent>
          <span>{content}</span>
        </StyledLabelContent>
      )}
      <StyledController changeDraggalbeFlag={setDraggableFlag} />
    </Wrapper>
  );
};

export default EditableLabelWrapper;
