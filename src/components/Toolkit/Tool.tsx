import React from 'react';
import { ToolsNames } from './types';

import {
  Static as StaticLabel,
  Editable as EditableLabel,
} from './Label';
import {
  Static as StaticLink,
  Editable as EditableLink,
} from './Link';

interface ToolWithoutEditMode {
  tool: any;
  parentRef: React.RefObject<HTMLDivElement>;
  editable: false;
  editMode?: undefined;
  changeEditMode?: undefined;
}
interface ToolWithEditMode {
  tool: any;
  parentRef: React.RefObject<HTMLDivElement>;
  editable: true;
  editMode: boolean;
  changeEditMode: (flag: boolean) => void;
}

const Tool: React.FC<ToolWithoutEditMode | ToolWithEditMode> = ({
  editable,
  tool,
  editMode,
  changeEditMode,
  ...props
}) => {
  const staticToolProps = { tool, ...props };
  const editableToolProps = {
    tool,
    editMode,
    changeEditMode,
    ...props,
  };

  //Render editable tool
  if (editable === true) {
    switch (tool.data.type) {
      case ToolsNames.LABEL:
        return <EditableLabel {...editableToolProps} />;
      case ToolsNames.LINK:
        return <EditableLink {...editableToolProps} />;
      default:
        return null;
    }
  }

  //else render static tool
  switch (tool.data.type) {
    case ToolsNames.LABEL:
      return <StaticLabel {...staticToolProps} />;
    case ToolsNames.LINK:
      return <StaticLink {...staticToolProps} />;
    default:
      return null;
  }
};

export default Tool;
