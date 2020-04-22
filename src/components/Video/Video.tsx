import React, { ReactElement, forwardRef, Ref } from 'react';
import useVideo from 'hooks/useVideo';
import styled from 'styled-components';

import { MemomizedPlayButton } from './PlayButton';
import { MemomizedProgressBar } from './ProgressBar';
import ErrorRespnse from './ErrorResponse';
import Tools from 'components/Tools/Tools';

export const Wrapper = styled.div`
  position: relative;
  background-color: black;
  box-shadow: 0px 0px 60px #000000;
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
  height: 50px;
  width: 90%;
  justify-content: center;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%, 50%);
  background-color: ${({ theme }) => theme.color.black[2]};
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
    const { paused, error, time, duration, buffered } = state;

    const handleTogglePause = () => {
      paused ? controls.play() : controls.pause();
    };

    const handleSetVideoTime = (time: number) => {
      controls.seek(time);
    };
    const loaded = buffered.length !== 0;
    if (error) return <ErrorRespnse />;

    return (
      <>
        <Wrapper ref={ref} {...props}>
          <VideoWrapper onClick={handleTogglePause}>
            {video}
          </VideoWrapper>
          {loaded && <Tools editable={editable} currentTime={time} />}
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
        </Wrapper>
        {render && loaded && render(duration, time)}
      </>
    );
  },
);

export default Video;
