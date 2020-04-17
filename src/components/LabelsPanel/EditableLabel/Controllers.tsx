import React, { useContext } from 'react';
import styled from 'styled-components';
import Context from './Context';

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

export interface ControllersProps {}

const Controllers: React.SFC<ControllersProps> = ({ ...props }) => {
  const { handleChangeEditMode, editModeFlag } = useContext(Context);

  const handleChangeMode = (flag: boolean) => {
    handleChangeEditMode(flag);
  };

  return (
    <Wrapper {...props}>
      {editModeFlag ? (
        <CloseEdit
          onClick={() => handleChangeMode(false)}
          title="Close edit mode"
        >
          <span className="sr-only">Close edit mode</span>
          <span className="fa fa-close" aria-hidden="true"></span>
        </CloseEdit>
      ) : (
        <EditIcon onClick={() => handleChangeMode(true)} title="Edit">
          <span className="sr-only">Edit</span>
          <span className="fa fa-pencil" aria-hidden="true"></span>
        </EditIcon>
      )}
    </Wrapper>
  );
};

export default Controllers;
