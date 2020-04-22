import React, { useRef } from 'react';
import styled from 'styled-components';

import Video from 'components/Video/Video';
import ToolBar from './ToolBar/ToolBar';
import Timelines from './Timelines/Timelines';

const StyledVideo = styled(Video)``;
const VideoWrapper = styled.div``;
const StyledTimelines = styled(Timelines)``;
const Wrapper = styled.div`
  display: grid;
  grid-column-gap: 40px;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-template-columns: 1fr 25%;
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    grid-template-columns: 1fr 20%;
    grid-column-gap: 100px;
  }
`;

export interface IVideoWithEditorProps {}

const VideoWithEditor: React.FC<IVideoWithEditorProps> = () => {
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <Wrapper>
      <VideoWrapper>
        <StyledVideo
          editable
          ref={videoWrapperRef}
          render={(duration, currentTime) => (
            <StyledTimelines
              duration={duration}
              currentTime={currentTime}
            />
          )}
        />
      </VideoWrapper>
      <ToolBar wrapper={videoWrapperRef} />
    </Wrapper>
  );
};

export default VideoWithEditor;
