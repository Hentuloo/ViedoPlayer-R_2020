import React from 'react';
import styled from 'styled-components';

import NavigationTemplate from 'templates/NavigationTemplate';
import VideoWithEditor from 'components/VideoWithEditor';

const Wrapper = styled.div`
  display: grid;
  width: 90%;
  max-width: 1200px;
  min-height: 100vh;
  align-items: center;
  margin: 0px auto;
  color: ${({ theme }) => theme.color.brand[0]};

  ${({ theme }) => theme.mediaQuery.md} {
    width: 85%;
  }
`;

function VideoEditor() {
  return (
    <NavigationTemplate>
      <Wrapper>
        <VideoWithEditor />
      </Wrapper>
    </NavigationTemplate>
  );
}

export default VideoEditor;
