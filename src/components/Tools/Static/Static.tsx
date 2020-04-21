import React from 'react';
import styled from 'styled-components';

import { useToolPosition } from '../utils/useToolPosition';
import Wrapper from '../utils/Wrapper';
import { StaticToolComponent } from '../types';

export const StyledWrapper = styled(Wrapper)`
  pointer-events: all;
`;

const Static: React.FC<StaticToolComponent> = ({
  tool: { cord },
  parentRef,
  render,
  ...props
}) => {
  const ref = useToolPosition<HTMLDivElement>(
    cord,
    parentRef.current,
  );

  return (
    <StyledWrapper
      ref={ref}
      {...props}
      size={{
        width: cord.width,
        height: cord.height,
      }}
    >
      {render()}
    </StyledWrapper>
  );
};

export default Static;
