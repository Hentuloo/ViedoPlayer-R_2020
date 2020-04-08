import React, { memo } from 'react';
import styled from 'styled-components';

import playSVG from 'assets/svg/playButton.svg';
import stopSVG from 'assets/svg/stopButton.svg';

export const Button = styled.button`
  height: 100%;
  margin: 0px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
export const Icon = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

export interface PlayButtonProps {
  status: boolean;
  toggle: () => void;
}

const PlayButton: React.SFC<PlayButtonProps> = ({
  status,
  toggle,
  ...props
}) => {
  const buttonStatusText = status ? 'Play' : 'Pause';
  return (
    <Button onClick={toggle} title={buttonStatusText} {...props}>
      <span className="sr-only">{buttonStatusText}</span>
      <Icon src={status ? playSVG : stopSVG} alt={buttonStatusText} />
    </Button>
  );
};
export const MemomizedPlayButton = memo(
  PlayButton,
  (prev, next) => prev.status === next.status,
);
export default PlayButton;
