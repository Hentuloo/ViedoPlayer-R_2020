import React from 'react';
import styled from 'styled-components';

import NavigationTemplate from 'templates/NavigationTemplate';
import VideoWithEditor from 'components/VideoWithEditor';

const Wrapper = styled.div`
  display: grid;
  width: 90%;
  max-width: 850px;
  min-height: 100vh;
  margin: 0px auto;
  color: ${({ theme }) => theme.color.brand[0]};

  ${({ theme }) => theme.mediaQuery.md} {
    width: 85%;
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    align-items: center;
    max-width: 1100px;
  }
`;
const StyledVideoWithEditor = styled(VideoWithEditor)`
  margin: 100px auto 30px;
  ${({ theme }) => theme.mediaQuery.vlg} {
    margin: 0px auto;
  }
`;

function VideoEditor() {
  return (
    <NavigationTemplate>
      <Wrapper>
        <StyledVideoWithEditor />
      </Wrapper>
    </NavigationTemplate>
  );
}

export default VideoEditor;
