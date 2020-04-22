import React from 'react';
import styled from 'styled-components';
import Video from 'components/Video/Video';
import NavigationTemplate from 'templates/NavigationTemplate';

const Wrapper = styled.div`
  display: grid;
  width: 90%;
  max-width: 700px;
  min-height: 100vh;
  margin: 0px auto;
  color: ${({ theme }) => theme.color.brand[0]};
  align-items: center;
  ${({ theme }) => theme.mediaQuery.md} {
    width: 85%;
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    max-width: 900px;
  }
`;

function VideoPage() {
  return (
    <NavigationTemplate>
      <Wrapper>
        <Video />
      </Wrapper>
    </NavigationTemplate>
  );
}

export default VideoPage;
