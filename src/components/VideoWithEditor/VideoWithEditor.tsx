import React from 'react';
import styled from 'styled-components';

import Video from 'components/Video/Video';
import ExtrasBar from './ExtrasBar';
import Timelines from './Timelines';

const Wrapper = styled.div`
  display: grid;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-template-columns: 1fr 25%;
  }
`;

export interface IVideoWithEditorProps {}

const VideoWithEditor: React.FC<IVideoWithEditorProps> = () => {
  return (
    <Wrapper>
      <Video editableLabels={true} />
      <ExtrasBar />
      <Timelines />
    </Wrapper>
  );
};

export default VideoWithEditor;
