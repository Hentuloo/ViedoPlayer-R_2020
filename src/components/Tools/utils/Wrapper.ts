import styled from 'styled-components';

export interface ToolWrapperCord {
  size: {
    width: number;
    height: number;
  };
}
const ToolWrapper = styled.div<ToolWrapperCord>`
  position: absolute;
  display: grid;
  width: ${({ size }) => `${size.width}%`};
  height: ${({ size }) => `${size.height}%`};
  resize: both;
  font-size: 8px;
  ${({ theme }) => theme.mediaQuery.sm} {
    font-size: 12px;
  }
  ${({ theme }) => theme.mediaQuery.md} {
    font-size: 15px;
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    font-size: 20px;
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    font-size: 22px;
  }
`;

export default ToolWrapper;
