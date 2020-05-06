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
  grid-column-gap: 20px;
  margin-top: 80px;
  padding-bottom: 200px;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-template-columns: 1fr 25%;
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    width: 100%;
    grid-template-columns: 1fr 23%;
    grid-column-gap: 50px;
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    grid-template-columns: 1fr 20%;
    grid-column-gap: 100px;
  }
`;

export interface IVideoWithEditorProps {}

const VideoWithEditor: React.FC<IVideoWithEditorProps> = ({
  ...props
}) => {
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <Wrapper {...props}>
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
