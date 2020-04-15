import React from 'react';
import styled from 'styled-components';
import Video from 'components/Video/Video';
import NavigationTemplate from 'templates/NavigationTemplate';

const Wrapper = styled.div`
  display: grid;
  max-width: 1200px;
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
              cord: { left: 50, top: 10, width: 40, height: 15 },
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
