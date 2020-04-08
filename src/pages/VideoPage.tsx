import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: ${({ theme }) => theme.color.brand[0]};
`;

function App() {
  return (
    <Wrapper>
      <header className="App-header">My video title</header>
    </Wrapper>
  );
}

export default App;
