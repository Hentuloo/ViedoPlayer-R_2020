import React, {
  ReactElement,
  forwardRef,
  Ref,
  useCallback,
} from 'react';
import useVideo from 'hooks/useVideo';
import styled, { css } from 'styled-components';

import { MemomizedPlayButton } from './PlayButton';
import { MemomizedProgressBar } from './ProgressBar';
import ErrorRespnse from './ErrorResponse';
import Tools from 'components/Tools/Tools';
import { useSelector } from 'react-redux';
import { getVideoUrl } from 'store/selectors/videoSelectors';

export const Wrapper = styled.div`
  position: relative;
  background-color: black;
  box-shadow: 0px 0px 60px #000000;
`;
interface VideoWrapperProps {
  loaded: boolean;
}
export const VideoWrapper = styled.div<VideoWrapperProps>`
  position: relative;
  max-height: 90vh;
  ${({ loaded }) =>
    !loaded &&
    css`
      min-height: 300px;
    `}
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
  ${({ theme }) => theme.mediaQuery.mobileLandscape} {
    opacity: 0;
    transform: translate(-50%, 0%);
  }
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
    const url = useSelector(getVideoUrl());

    const [video, state, controls] = useVideo(
      <VideoElement src={url} data-test-id="video-player" />,
    );
    const { paused, error, time, duration, buffered } = state;

    const handleTogglePause = useCallback(() => {
      paused ? controls.play() : controls.pause();
    }, [controls, paused]);

    const handleSetVideoTime = useCallback(
      (time: number) => {
        controls.seek(time);
      },
      [controls],
    );

    if (error)
      return (
        <>
          <div className="sr-only">{video}</div>
          <ErrorRespnse />
        </>
      );
    const loaded = buffered.length !== 0;

    return (
      <>
        <Wrapper ref={ref} {...props}>
          <VideoWrapper loaded={loaded} onClick={handleTogglePause}>
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
        {render && render(duration, time)}
      </>
    );
  },
);

export default Video;
