import React, { useRef } from 'react';
import styled from 'styled-components';
import EditableTool from './Editable/Editable';
import StaticTool from './Static/Static';
import { useSelector } from 'react-redux';
import { getToolsAsArray } from 'store/selectors/toolsSelectors';
import Tool from 'components/Toolkit/Tool';

export const Wrapper = styled.div`
  position: absolute;
  left: 0%;
  top: 0%;
  width: 100%;
  height: calc(100% - 24px);
  pointer-events: none;
  overflow: hidden;
`;

export type ToolsContainerProps = {
  editable?: boolean;
  currentTime: number;
};

const ToolsContainer: React.SFC<ToolsContainerProps> = ({
  currentTime,
  editable,
}) => {
  const tools = useSelector(getToolsAsArray());
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Wrapper ref={ref}>
      {tools.map((tool) => {
        const { from, to } = tool.time;

        const showTool =
          typeof from !== 'number' ||
          typeof to !== 'number' ||
          (from <= currentTime && to >= currentTime);

        if (!showTool) return null;
        return editable ? (
          <EditableTool
            key={tool.id}
            parentRef={ref}
            tool={tool}
            render={(editMode, changeEditMode) => (
              <Tool
                editable
                tool={tool}
                parentRef={ref}
                editMode={editMode}
                changeEditMode={changeEditMode}
              />
            )}
          />
        ) : (
          <StaticTool
            key={tool.id}
            parentRef={ref}
            tool={tool}
            render={() => (
              <Tool editable={false} tool={tool} parentRef={ref} />
            )}
          />
        );
      })}
    </Wrapper>
  );
};

export default ToolsContainer;
