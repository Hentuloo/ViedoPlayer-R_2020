import React from 'react';
import { ToolsNames } from './types';

import {
  Static as StaticLabel,
  Editable as EditableLabel,
} from './Label';

import { ToolInterfaceWithId } from 'store/actions/types';

interface Tool {
  tool: ToolInterfaceWithId;
  parentRef: React.RefObject<HTMLDivElement>;
}

interface ToolWithoutEditMode extends Tool {
  editable: false;
  editMode?: undefined;
  changeEditMode?: undefined;
}
interface ToolWithEditMode extends Tool {
  editable: true;
  editMode: boolean;
  changeEditMode: (flag: boolean) => void;
}

export type ToolCreatorInterface =
  | ToolWithoutEditMode
  | ToolWithEditMode;

const Tool: React.FC<ToolCreatorInterface> = ({
  editable,
  tool,
  editMode,
  changeEditMode,
  ...props
}) => {
  switch (tool.data.type) {
    case ToolsNames.LABEL:
      return editable === true ? (
        <EditableLabel
          tool={tool}
          //@ts-ignore
          editMode={editMode}
          //@ts-ignore
          changeEditMode={changeEditMode}
          {...props}
        />
      ) : (
        <StaticLabel tool={tool} {...props} />
      );
    default:
      return null;
  }
};

export default Tool;
