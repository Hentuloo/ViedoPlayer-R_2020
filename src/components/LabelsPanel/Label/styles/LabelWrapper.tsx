import { css } from 'styled-components';

export interface LabelWrapperCord {
  size: {
    width: number;
    height: number;
  };
}
export default css<LabelWrapperCord>`
  position: absolute;
  display: grid;
  min-width: ${({ size }) => `${size.width}%`};
  min-height: ${({ size }) => `${size.height}%`};
  background-color: ${({ theme }) => theme.color.black[0]};
  resize: both;
`;
