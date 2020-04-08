import React from 'react';
import styled from 'styled-components';

import Video from './Video/Video';

export const Wrapper = styled.div``;
export const Labels = styled.div``;

export interface VideoWithLabelsProps {}

const VideoWithLabels: React.SFC<VideoWithLabelsProps> = () => {
  return (
    <Wrapper>
      <Video />
      <Labels></Labels>
    </Wrapper>
  );
};

export default VideoWithLabels;
