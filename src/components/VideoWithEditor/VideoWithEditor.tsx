import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import Video from 'components/Video/Video';
import ExtrasBar from './ExtrasBar';
import Timelines from './Timelines';

import { useDraggable } from 'hooks/useDraggable/useDraggable';
import { detectMouseIsOnElement } from '../../config/utils';

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
  const {
    draggableRef,
    draggableStreams,
    resetPosition,
  } = useDraggable({});
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const videoWrapper = videoWrapperRef.current;
    const target = draggableRef.current;
    if (!videoWrapper || !target) return;

    draggableStreams(target).mouseup.subscribe((ev) => {
      const inVideoWrapper = detectMouseIsOnElement(ev, videoWrapper);
      resetPosition();
      if (inVideoWrapper) {
        alert('ADD label!');
      }
    });
  }, []);

  return (
    <Wrapper>
      <VideoWrapper ref={videoWrapperRef}>
        <StyledVideo editableLabels={true} />
      </VideoWrapper>
      <ExtrasBar ref={draggableRef} />
      <Timelines />
    </Wrapper>
  );
};

export default VideoWithEditor;
