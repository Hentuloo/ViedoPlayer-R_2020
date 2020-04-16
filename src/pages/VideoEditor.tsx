import React from 'react';
import styled from 'styled-components';

import NavigationTemplate from 'templates/NavigationTemplate';
import VideoWithEditor from 'components/VideoWithEditor/VideoWithEditor';

const Wrapper = styled.div`
  display: grid;
  max-width: 1200px;
  /* height: 100vh; */
  margin: 0px auto;
  color: ${({ theme }) => theme.color.brand[0]};
`;

function VideoEditor() {
  return (
    <NavigationTemplate>
      <Wrapper>
        <header>Tu można dodawać zakładki do filmu</header>
        <VideoWithEditor />
      </Wrapper>
    </NavigationTemplate>
  );
}

export default VideoEditor;
