import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import EditableTool from './Editable/Editable';
import StaticTool from './Static/Static';
import { useSelector } from 'react-redux';
import { getToolsAsArray } from 'store/selectors/toolsSelectors';
import Tool from 'components/Toolkit/Tool';
import gsap from 'gsap';

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
  const toolsRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    //show/hide elements on time
    const toolsNodes = toolsRefs.current;
    if (toolsNodes.length === 0) return;
    tools.forEach((tool, index) => {
      const { from, to } = tool.time;
      if (typeof from !== 'number' || typeof to !== 'number') return;

      const IsInsideTimePeriod =
        from <= currentTime && to >= currentTime;
      gsap.set(toolsNodes[index], {
        opacity: IsInsideTimePeriod ? 1 : 0,
      });
    });
  }, [currentTime, editable, tools]);

  return (
    <Wrapper ref={ref}>
      {tools.map((tool, index) => (
        <div
          ref={(ref: HTMLDivElement) =>
            (toolsRefs.current[index] = ref)
          }
          key={tool.id}
        >
          {editable ? (
            <EditableTool
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
              parentRef={ref}
              tool={tool}
              render={() => (
                <Tool editable={false} tool={tool} parentRef={ref} />
              )}
            />
          )}
        </div>
      ))}
    </Wrapper>
  );
};

export default ToolsContainer;
