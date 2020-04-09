import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  right: 0%;
  top: 0%;
  color: ${({ theme }) => theme.color.white[0]};
`;

const IconButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.color.white[0]};
  cursor: pointer;
`;

export const CloseEdit = styled(IconButton)``;
export const EditIcon = styled(IconButton)``;

export interface ControllersProps {
  changeEditMode: (flag?: boolean) => void;
  editMode: boolean;
}

const Controllers: React.SFC<ControllersProps> = ({
  changeEditMode,
  editMode,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      {editMode ? (
        <CloseEdit
          onClick={() => changeEditMode(false)}
          title="Close edit mode"
        >
          <span className="sr-only">Close edit mode</span>
          <span className="fa fa-close" aria-hidden="true"></span>
        </CloseEdit>
      ) : (
        <EditIcon onClick={() => changeEditMode(true)} title="Edit">
          <span className="sr-only">Edit</span>
          <span className="fa fa-pencil" aria-hidden="true"></span>
        </EditIcon>
      )}
    </Wrapper>
  );
};

export default Controllers;
