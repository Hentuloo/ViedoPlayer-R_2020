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
  width: ${({ size }) => `${size.width}%`};
  min-height: ${({ size }) => `${size.height}%`};
  background-color: ${({ theme }) => theme.color.black[0]};
  resize: both;
  font-size: 9px;
  ${({ theme }) => theme.mediaQuery.sm} {
    font-size: 13px;
  }
  ${({ theme }) => theme.mediaQuery.md} {
    width: ${({ size }) => `${size.width}%`};
    font-size: 17px;
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    font-size: 20px;
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    font-size: 25px;
  }
`;
