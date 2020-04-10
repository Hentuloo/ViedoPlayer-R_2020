import React from 'react';
import useVideo from 'hooks/useVideo';
import styled from 'styled-components';

import { MemomizedPlayButton } from './PlayButton';
import { MemomizedProgressBar } from './ProgressBar';
import ErrorRespnse from './ErrorResponse';
import Labels from 'components/LabelsPanel/LabelsPanel';

export const Wrapper = styled.div`
  position: relative;
  display: grid;
  user-select: none;
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

export interface VideoProps {
  editableLabels?: boolean;
}

const Video: React.SFC<VideoProps> = ({ editableLabels = true }) => {
  const [video, state, controls] = useVideo(
    <VideoElement src="http://techslides.com/demos/sample-videos/small.mp4" />,
  );

  const handleTogglePause = () => {
    state.paused ? controls.play() : controls.pause();
  };

  const handleSetVideoTime = (time: number) => {
    controls.seek(time);
  };

  if (state.error) return <ErrorRespnse />;

  return (
    <Wrapper>
      <VideoWrapper onClick={handleTogglePause}>{video}</VideoWrapper>
      <Controllers>
        <StyledPlayButton
          status={state.paused}
          toggle={handleTogglePause}
        />
        <MemomizedProgressBar
          currentTime={state.time}
          duration={state.duration}
          setNewTime={handleSetVideoTime}
        />
      </Controllers>
      <Labels editable={editableLabels} />
    </Wrapper>
  );
};

export default Video;
