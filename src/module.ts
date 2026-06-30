import { PanelPlugin } from '@grafana/data';
import { ILITablePanel } from './components/Panel';
import { PanelOptions, defaultOptions } from './types';

export const plugin = new PanelPlugin<PanelOptions>(ILITablePanel).setPanelOptions((builder) => {
  return builder
    .addNumberInput({
      path: 'fontSize',
      name: 'Schriftgröße Inhalt (px)',
      description: 'Schriftgröße des Tabelleninhalts in Pixel',
      category: ['Schrift'],
      defaultValue: defaultOptions.fontSize,
      settings: {
        min: 8,
        max: 48,
        step: 1,
      },
    })
    .addNumberInput({
      path: 'headerFontSize',
      name: 'Schriftgröße Header (px)',
      description: 'Schriftgröße der Spaltenüberschriften in Pixel',
      category: ['Schrift'],
      defaultValue: defaultOptions.headerFontSize,
      settings: {
        min: 8,
        max: 48,
        step: 1,
      },
      showIf: (opts) => opts.showHeader,
    })
    .addBooleanSwitch({
      path: 'showHeader',
      name: 'Header anzeigen',
      category: ['Schrift'],
      defaultValue: defaultOptions.showHeader,
    })
    .addBooleanSwitch({
      path: 'wordWrap',
      name: 'Zeilenumbruch',
      category: ['Schrift'],
      defaultValue: defaultOptions.wordWrap,
    })
    .addNumberInput({
      path: 'rowHeight',
      name: 'Zeilenhöhe (px)',
      description: 'Höhe einer Tabellenzeile in Pixel',
      category: ['Zeilen & Zellen'],
      defaultValue: defaultOptions.rowHeight,
      settings: {
        min: 16,
        max: 200,
        step: 1,
      },
    })
    .addNumberInput({
      path: 'cellPaddingX',
      name: 'Zellenabstand horizontal (px)',
      description: 'Innenabstand links/rechts pro Zelle – beeinflusst die effektive Spalten-/Zeilenbreite',
      category: ['Zeilen & Zellen'],
      defaultValue: defaultOptions.cellPaddingX,
      settings: {
        min: 0,
        max: 64,
        step: 1,
      },
    })
    .addBooleanSwitch({
      path: 'zebraStripes',
      name: 'Zeilenschattierung (Zebra-Streifen)',
      description: 'Jede zweite Zeile wird grau hervorgehoben',
      category: ['Zeilen & Zellen'],
      defaultValue: defaultOptions.zebraStripes,
    })
    .addColorPicker({
      path: 'zebraColor',
      name: 'Farbe der Zeilenschattierung',
      description: 'Farbe/Deckkraft für jede zweite Zeile',
      category: ['Zeilen & Zellen'],
      defaultValue: defaultOptions.zebraColor,
      showIf: (opts) => opts.zebraStripes,
    });
});
