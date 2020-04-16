import React, { useState } from 'react';
import { EditabLabelElementProps } from '../types';
import Context from './Context';
import EditableLabelWrapper from './EditableWrapper';

const Label: React.FC<EditabLabelElementProps> = ({
  label,
  events: { changeCord, changeLabelSize, changeContent },
  parentRef,
  ...props
}) => {
  const [editMode, setEditMode] = useState(false);

  const handleChangeLabelCord = (x: number, y: number) =>
    changeCord(label.id, { x, y });

  const handleChangeEditMode = (flag: boolean) => {
    setEditMode(flag);
  };

  const handleChangeLabelSize = (width: number, height: number) =>
    changeLabelSize(label.id, width, height);

  const handleChangeContent = (content: string) =>
    changeContent(label.id, content);

  const contextValue = {
    label,
    editModeFlag: editMode,
    handleChangeEditMode,
    handleChangeLabelSize,
    handleChangeLabelCord,
    handleChangeContent,
  };
  return (
    <Context.Provider value={contextValue}>
      <EditableLabelWrapper parentRef={parentRef} {...props} />
    </Context.Provider>
  );
};

export default Label;
