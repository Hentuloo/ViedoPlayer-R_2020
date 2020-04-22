import React from 'react';
import styled from 'styled-components';

import ListElements from './ListElements';

const Wrapper = styled.nav`
  position: fixed;
`;
const ListWrapper = styled.ul`
  width: 140px;
  height: 50px;
  line-height: 50px;
  display: flex;
  align-items: center;
  list-style: none;
  align-items: space-between;
  margin: 5px 10px;
  ${({ theme }) => theme.mediaQuery.md} {
    margin: 10px 20px;
  }
`;

export interface NavigationProps {}

const Navigation: React.SFC<NavigationProps> = () => {
  return (
    <Wrapper>
      <ListWrapper>
        <ListElements />
      </ListWrapper>
    </Wrapper>
  );
};

export default Navigation;
