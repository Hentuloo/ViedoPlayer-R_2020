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
        <Video />
      </Wrapper>
    </NavigationTemplate>
  );
}

export default VideoPage;
