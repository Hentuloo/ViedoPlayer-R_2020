import React from 'react';
import styled from 'styled-components';

import errorSVG from 'assets/svg/errorMark.svg';

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  justify-content: center;
`;
const Image = styled.img`
  min-width: 150px;
  min-height: 150px;
  width: 100%;
  height: 100%;
`;

export interface ErrorRespnseProps {}

const ErrorRespnse: React.FC<ErrorRespnseProps> = () => {
  return (
    <Wrapper>
      <Image src={errorSVG} alt="something gone wrong" />
      <span>Something gone wrong try later</span>
    </Wrapper>
  );
};

export default ErrorRespnse;
