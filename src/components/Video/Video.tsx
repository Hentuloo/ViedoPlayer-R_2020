import React from 'react';
import useVideo from 'hooks/useVideo';
import styled from 'styled-components';

import { MemomizedPlayButton } from './PlayButton';
import { MemomizedProgressBar } from './ProgressBar';
import ErrorRespnse from './ErrorResponse';
import Labels from 'components/LabelsPanel/LabelsPanel';
import {
  LabelInterface,
  LabelsEvents,
} from 'components/LabelsPanel/types';

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

export interface VideoProps {
  labels?: LabelInterface[];
  labelsEvents?: LabelsEvents;
}

const Video: React.SFC<VideoProps> = ({
  labels,
  labelsEvents,
  ...props
}) => {
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
    <Wrapper {...props}>
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
      <Labels labels={labels} labelsEvents={labelsEvents} />
    </Wrapper>
  );
};

export default Video;
