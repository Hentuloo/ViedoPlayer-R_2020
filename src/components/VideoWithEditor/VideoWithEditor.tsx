import React, { useRef, useReducer } from 'react';
import styled from 'styled-components';

import Video from 'components/Video/Video';
import ToolBar from '../ToolBar/ToolBar';
import Timelines from '../Timelines/Timelines';

import { LabelNewCords } from 'components/LabelsPanel/types';
import labelReducer, { actionTypes } from './LabelsReducer';
import { getCordsPrecentsInsideWrapper } from 'config/utils';
import { progressBarHeight } from 'components/Video/config';

const StyledVideo = styled(Video)``;
const VideoWrapper = styled.div`
  align-self: flex-start;
`;
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
  const changeLabelCord = (id: number, cord: LabelNewCords) => {
    const wrapper = videoWrapperRef.current;
    if (!wrapper) return;
    const { offsetWidth, offsetHeight } = wrapper;

    const precents = getCordsPrecentsInsideWrapper(cord, {
      offsetWidth,
      offsetHeight: offsetHeight - progressBarHeight,
    });
    if (precents) {
      dispatch({
        type: actionTypes.CHANGE_CORDS,
        payload: { id, ...precents },
      });
    }
  };

  const changeLabelSize = (id: number, w: number, h: number) => {
    const wrapper = videoWrapperRef.current;
    if (!wrapper) return;
    const { offsetWidth, offsetHeight } = wrapper;
    //transform to percents by parent wrapper
    let width = Number(((w / offsetWidth) * 100).toFixed(2));
    let height = Number(
      ((h / (offsetHeight - progressBarHeight)) * 100).toFixed(2),
    );

    //set max size
    width = width >= 50 ? 50 : width;
    height = height >= 50 ? 50 : height;

    dispatch({
      type: actionTypes.CHANGE_SIZE,
      payload: { id, width, height },
    });
  };

  const changeContent = (id: number, content: string) => {
    dispatch({
      type: actionTypes.CHANGE_CONTENT,
      payload: { id, content },
    });
  };

  return (
    <Wrapper>
      <VideoWrapper ref={videoWrapperRef}>
        <StyledVideo
          labels={labels}
          labelsEvents={{
            changeCord: changeLabelCord,
            changeLabelSize,
            changeContent,
          }}
        >
          {(duration, currentTime) => (
            <Timelines
              duration={duration}
              currentTime={currentTime}
            />
          )}
        </StyledVideo>
      </VideoWrapper>
      <ToolBar wrapper={videoWrapperRef} addLabel={addLabel} />
    </Wrapper>
  );
};

export default VideoWithEditor;
