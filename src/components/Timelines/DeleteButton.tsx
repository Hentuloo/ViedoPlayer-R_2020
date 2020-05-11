import React, { memo } from 'react';
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
}) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(removeTool(toolId));
  };
  return (
    <Wrapper
      title="Delete"
      onClick={handleClick}
      data-testid="delete-tool"
    >
      <span className="sr-only">
        Delete tool: `&quot;`{content}`&quot;`
      </span>
      <span className="fa fa-trash" aria-hidden="true"></span>
    </Wrapper>
  );
};

export default memo(DeleteButton);
