import { css } from 'styled-components';

export interface LabelWrapperCord {
  left: number;
  top: number;
  width: number;
  height: number;
}
export default css<LabelWrapperCord>`
  position: absolute;
  display: inline-block;
  min-width: ${({ width }) => `${width}px`};
  min-height: ${({ height }) => `${height}px`};
  transform: ${({ left, top }) => `translate(${left}px,${top}px)`};
  background-color: ${({ theme }) => theme.color.black[0]};
`;
