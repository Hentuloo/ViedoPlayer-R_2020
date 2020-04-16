import { createContext } from 'react';
import { LabelInterface } from '../types';

export interface ContextInterface {
  label: LabelInterface;
  editModeFlag: boolean;
  handleChangeEditMode: (flag: boolean) => void;
  handleChangeLabelSize: (width: number, height: number) => void;
  handleChangeLabelCord: (x: number, y: number) => void;
  handleChangeContent: (value: string) => void;
}

export default createContext({} as ContextInterface);
