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
  font-size: 1.2em;
  ${({ theme }) => theme.mediaQuery.md} {
    font-size: 0.9em;
  }
`;

export const CloseEdit = styled(IconButton)``;
export const EditIcon = styled(IconButton)``;

export interface ControllersProps {
  editMode: boolean;
  onChange: (flag: boolean) => any;
}

const Controllers: React.SFC<ControllersProps> = ({
  onChange,
  editMode,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      {editMode ? (
        <CloseEdit
          onClick={() => onChange(false)}
          title="Close edit mode"
        >
          <span className="sr-only">Close edit mode</span>
          <span className="fa fa-close" aria-hidden="true"></span>
        </CloseEdit>
      ) : (
        <EditIcon onClick={() => onChange(true)} title="Edit">
          <span className="sr-only">Edit</span>
          <span className="fa fa-pencil" aria-hidden="true"></span>
        </EditIcon>
      )}
    </Wrapper>
  );
};

export default Controllers;
