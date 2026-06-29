import { PanelPlugin } from '@grafana/data';
import { ILITablePanel } from './components/Panel';
import { PanelOptions, defaultOptions } from './types';

export const plugin = new PanelPlugin<PanelOptions>(ILITablePanel).setPanelOptions((builder) => {
  return builder
    .addNumberInput({
      path: 'fontSize',
      name: 'Schriftgröße (px)',
      description: 'Schriftgröße des Tabelleninhalts in Pixel',
      defaultValue: defaultOptions.fontSize,
      settings: {
        min: 8,
        max: 48,
        step: 1,
      },
    })
    .addBooleanSwitch({
      path: 'showHeader',
      name: 'Header anzeigen',
      defaultValue: defaultOptions.showHeader,
    })
    .addBooleanSwitch({
      path: 'wordWrap',
      name: 'Zeilenumbruch',
      defaultValue: defaultOptions.wordWrap,
    });
});
