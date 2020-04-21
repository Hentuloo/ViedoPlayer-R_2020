import React, { useRef } from 'react';
import styled from 'styled-components';

import Video from 'components/Video/Video';
import ToolBar from './ToolBar/ToolBar';
import Timelines from './Timelines/Timelines';

const StyledVideo = styled(Video)``;
const VideoWrapper = styled.div``;
const Wrapper = styled.div`
  display: grid;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-template-columns: 1fr 25%;
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
            <Timelines
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
