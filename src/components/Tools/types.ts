import { ToolInterfaceWithId } from 'store/actions/types';

interface Component {
  tool: ToolInterfaceWithId;
  parentRef: React.RefObject<HTMLDivElement>;
}

export interface StaticToolComponent extends Component {
  render: () => any;
}
export interface EditableToolComponent extends Component {
  render: (editMode: boolean, change: (flag: boolean) => any) => any;
}
