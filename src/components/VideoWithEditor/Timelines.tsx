import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  grid-column: 1/-1;
`;

export interface TimelinesProps {}

const Timelines: React.SFC<TimelinesProps> = () => {
  return <Wrapper>Paski zarządzania czasem zakładek</Wrapper>;
};

export default Timelines;
