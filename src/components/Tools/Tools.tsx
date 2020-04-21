import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import EditableTool from './Editable/Editable';
import StaticTool from './Static/Static';
import { useSelector } from 'react-redux';
import { getToolsAsArray } from 'store/selectors/getToolsAsArray';
import Tool from './Toolkit/Tool';
import gsap from 'gsap';

export const Wrapper = styled.div`
  position: absolute;
  left: 0%;
  top: 0%;
  width: 100%;
  height: calc(100% - 40px);
  pointer-events: none;
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

  useEffect(() => {
    if (editable) return;
    const wrapper = ref.current;
    if (!wrapper) return;
    const toolsNodes = [...wrapper.children];
    toolsNodes.forEach((node, index) => {
      const { from, to } = tools[index].time;
      if (from === null && to === null) return;
      //@ts-ignore
      if (from < currentTime && to > currentTime) {
        gsap.set(node, { opacity: 1 });
      } else {
        gsap.set(node, { opacity: 0 });
      }
    });
  }, [currentTime]);

  return (
    <Wrapper ref={ref}>
      {tools.map((tool) =>
        editable ? (
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
        ),
      )}
    </Wrapper>
  );
};

export default ToolsContainer;
