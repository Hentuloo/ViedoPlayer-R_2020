import React from 'react';
import styled from 'styled-components';
import Video from 'components/Video/Video';
import NavigationTemplate from 'templates/NavigationTemplate';

const Wrapper = styled.div`
  display: grid;
  max-width: 800px;
  margin: 0px auto;
  color: ${({ theme }) => theme.color.brand[0]};
`;

function VideoPage() {
  return (
    <NavigationTemplate>
      <Wrapper>
        <header>Tu można oglądać film z zakładkami</header>
        <Video
          labels={[
            {
              id: 1,
              cord: { left: 100, top: 40, width: 180, height: 80 },
              content: 'Your example label',
              // timeline: { from: 0.2, to: 0.3 },
            },
          ]}
        />
      </Wrapper>
    </NavigationTemplate>
  );
}

export default VideoPage;
