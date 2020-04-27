import React from 'react';
import styled from 'styled-components';
import { LinkStatic } from '../types';

const Link = styled.a`
  position: absolute;
  display: grid;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  text-align: center;
  align-items: center;
  color: ${({ theme }) => theme.color.white[1]};
  background-color: ${({ theme }) => theme.color.black[1]};
`;
export const Static: React.SFC<LinkStatic> = ({
  tool: {
    data: { content, url },
  },
}) => {
  return (
    <Link href={url} rel="noopener noreferrer" target="_blank">
      {content}
    </Link>
  );
};
