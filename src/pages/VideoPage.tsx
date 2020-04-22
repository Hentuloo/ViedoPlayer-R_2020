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
  ${({ theme }) => theme.mediaQuery.mobileLandscape} {
    max-height: 95%;
    max-width: 92%;
    top: 5%;
    width: auto;
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
