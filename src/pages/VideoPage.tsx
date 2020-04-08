import React from 'react';
import styled from 'styled-components';
import VideoWthLabels from 'components/VideoWithLabels';

const Wrapper = styled.div`
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
