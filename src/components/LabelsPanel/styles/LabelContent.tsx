import styled from 'styled-components';

const LabelContent = styled.div`
  display: grid;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  text-align: center;
  align-items: center;
  color: ${({ theme }) => theme.color.red[1]};
`;

export default LabelContent;
