import React, { useRef, useReducer } from 'react';
import styled from 'styled-components';

import Video from 'components/Video/Video';
import ToolBar from './ToolBar/ToolBar';
import Timelines from './Timelines';

import { ChangeCordsPayload } from 'components/LabelsPanel/Labels/types';
import labelReducer, { actionTypes } from './LabelsReducer';

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
  const [labels, dispatch] = useReducer(labelReducer, []);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  const addLabel = (x: number, y: number) => {
    dispatch({ type: actionTypes.ADD, payload: { x, y } });
  };
  const changeLabelCord = (cord: ChangeCordsPayload) => {
    dispatch({ type: actionTypes.CHANGE_CORDS, payload: cord });
  };

  return (
    <Wrapper>
      <VideoWrapper ref={videoWrapperRef}>
        <StyledVideo
          labels={labels}
          labelsEvents={{
            changeCord: changeLabelCord,
          }}
        />
      </VideoWrapper>
      <ToolBar wrapper={videoWrapperRef} addLabel={addLabel} />
      <Timelines />
    </Wrapper>
  );
};

export default VideoWithEditor;
