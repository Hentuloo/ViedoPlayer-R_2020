import React from 'react';
import styled from 'styled-components';
import { IdType } from 'store/actions/types';
import { useDispatch } from 'react-redux';
import { removeTool } from 'store/actions/toolsActions';

const Wrapper = styled.button`
  font-size: ${({ theme }) => theme.fs.m};
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.color.brand[1]};
  cursor: pointer;
`;

export interface DeleteButtonProps {
  toolId: IdType;
  content: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  toolId,
  content,
  ...props
}) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(removeTool(toolId));
  };
  return (
    <Wrapper {...props} title="Delete" onClick={handleClick}>
      <span className="sr-only">
        Delete tool: `&quot;`{content}`&quot;`
      </span>
      <span className="fa fa-trash" aria-hidden="true"></span>
    </Wrapper>
  );
};

export default DeleteButton;
