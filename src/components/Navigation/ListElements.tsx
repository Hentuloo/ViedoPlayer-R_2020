import React from 'react';
import { NavLink } from 'react-router-dom';

import photoVideoIcon from 'assets/svg/photoVideoIcon.svg';
import cameraIcon from 'assets/svg/cameraIcon.svg';
import styled from 'styled-components';

const ListElement = styled.li`
  display: block;
  width: 100%;
  height: 100%;
`;
const StyledLink = styled(NavLink)`
  position: relative;
  display: block;
  text-align: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding: 10px 18px;

  &::after {
    content: '';
    position: absolute;
    width: 60px;
    height: 60px;
    left: 50%;
    bottom: 0%;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.gradients[1]};
    transform: translate(-50%, 10%);
    z-index: -1;
    opacity: 0;
  }

  &.active {
    &::after {
      opacity: 1;
    }
  }
`;
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export interface ListElementsProps {}

const ListElements: React.SFC<ListElementsProps> = () => {
  return (
    <>
      <ListElement>
        <StyledLink
          to="/"
          exact
          activeClassName="active"
          title="Watch vido"
        >
          <span className="sr-only">Watch vido</span>
          <Image src={cameraIcon} alt="Watch vido" />
        </StyledLink>
      </ListElement>
      <ListElement>
        <StyledLink
          to="/editor"
          activeClassName="active"
          title="Edit video"
        >
          <span className="sr-only">Edit video</span>
          <Image src={photoVideoIcon} alt="Edit video" />
        </StyledLink>
      </ListElement>
    </>
  );
};

export default ListElements;
