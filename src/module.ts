import { PanelProps } from '@grafana/data';
import ILITablePanel from './components/Panel';
import { PanelOptions } from './types';
import { PanelEditor } from './components/PanelEditor';

export { ILITablePanel, PanelEditor };
export { PanelOptions };
export const meta = {
  id: 'ili-table-panel',
  name: 'ILI Table',
  type: 'panel',
  module: 'dist/module.js',
  main: 'dist/module.js',
};
