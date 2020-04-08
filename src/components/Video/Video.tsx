import React from 'react';
import useVideo from 'hooks/useVideo';
import styled from 'styled-components';

import { MemomizedPlayButton } from './PlayButton';
import ProgressBar from './ProgressBar';

export const Wrapper = styled.div`
  position: relative;
  display: grid;
`;
export const VideoWrapper = styled.div``;
export const VideoElement = styled.video`
  display: block;
  width: 100%;
`;
export const Controllers = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: 55px 1fr;
  height: 40px;
  width: 100%;
  bottom: 0%;
`;
export const StyledPlayButton = styled(MemomizedPlayButton)`
  padding: 6px 4px 6px 0px;
`;

export interface VideoProps {}

const Video: React.SFC<VideoProps> = () => {
  const [video, state, controls, ref] = useVideo(
    <VideoElement src="http://techslides.com/demos/sample-videos/small.mp4" />,
  );

  const handleTogglePause = () => {
    state.paused ? controls.play() : controls.pause();
  };
  console.log(state);
  return (
    <Wrapper>
      <VideoWrapper>{video}</VideoWrapper>
      <Controllers>
        <StyledPlayButton
          status={state.paused}
          toggle={handleTogglePause}
        />
        <ProgressBar
          currentTime={state.time}
          duration={state.duration}
        />
      </Controllers>
    </Wrapper>
  );
};

export default Video;
