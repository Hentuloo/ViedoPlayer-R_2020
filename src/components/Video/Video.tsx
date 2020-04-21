import React, { ReactElement, forwardRef, Ref } from 'react';
import useVideo from 'hooks/useVideo';
import styled from 'styled-components';

import { MemomizedPlayButton } from './PlayButton';
import { MemomizedProgressBar } from './ProgressBar';
import ErrorRespnse from './ErrorResponse';
import Tools from 'components/Tools/Tools';

export const Wrapper = styled.div`
  position: relative;
`;
export const VideoWrapper = styled.div`
  position: relative;
`;
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
  overflow: hidden;
`;

export interface VideoProps {
  editable?: boolean;
  render?: (duration: number, currentTime: number) => ReactElement;
}

const Video = forwardRef(
  (
    { render, editable, ...props }: VideoProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const [video, state, controls] = useVideo(
      <VideoElement src="http://techslides.com/demos/sample-videos/small.mp4" />,
    );
    const { paused, error, time, duration } = state;

    const handleTogglePause = () => {
      paused ? controls.play() : controls.pause();
    };

    const handleSetVideoTime = (time: number) => {
      controls.seek(time);
    };

    if (error) return <ErrorRespnse />;

    return (
      <>
        <Wrapper ref={ref} {...props}>
          <VideoWrapper onClick={handleTogglePause}>
            {video}
          </VideoWrapper>
          <Controllers>
            <StyledPlayButton
              status={paused}
              toggle={handleTogglePause}
            />
            <MemomizedProgressBar
              currentTime={time}
              duration={duration}
              setNewTime={handleSetVideoTime}
            />
          </Controllers>
          <Tools editable={editable} currentTime={time} />
        </Wrapper>
        {render && render(duration, time)}
      </>
    );
  },
);

export default Video;
