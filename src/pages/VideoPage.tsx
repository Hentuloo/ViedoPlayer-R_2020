import React from 'react';
import styled from 'styled-components';
import VideoWthLabels from 'components/Video/Video';

const Wrapper = styled.div`
  display: grid;
  max-width: 800px;
  grid-template-columns: 1fr 25%;
  margin: 0px auto;
  color: ${({ theme }) => theme.color.brand[0]};
`;

function App() {
  return (
    <Wrapper>
      <VideoWthLabels />
    </Wrapper>
  );
}

export default App;
