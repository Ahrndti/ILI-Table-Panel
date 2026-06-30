import React, { useMemo } from 'react';
import { PanelProps } from '@grafana/data';
import { Table } from '@grafana/ui';
import { TableCellHeight } from '@grafana/schema';
import { PanelOptions, defaultOptions } from '../types';
import { getStyles } from './styles';

interface Props extends PanelProps<PanelOptions> {}

// @grafana/ui's <Table> berechnet die Höhe einer Zeile auch intern, für die
// virtualisierte Scroll-Liste (react-window). Dafür akzeptiert sie nur die
// drei festen Stufen 'sm' (~32px), 'md' (42px) und 'lg' (48px) – keine freie
// Pixelzahl. Um den frei wählbaren Pixel-Wert aus den Panel-Optionen
// trotzdem so gut wie möglich mit der internen Berechnung in Einklang zu
// bringen (und damit Lücken/Überlappungen beim Scrollen zu minimieren),
// wird hier die nächstliegende offizielle Stufe ermittelt. Die sichtbare
// Höhe wird zusätzlich per CSS exakt auf den gewünschten Pixel-Wert gesetzt
// (siehe styles.ts).
function closestCellHeight(rowHeight: number): TableCellHeight {
  const stops: Array<[number, TableCellHeight]> = [
    [32, TableCellHeight.Sm],
    [42, TableCellHeight.Md],
    [48, TableCellHeight.Lg],
  ];
  let best = stops[0];
  let bestDiff = Math.abs(rowHeight - best[0]);
  for (const stop of stops) {
    const diff = Math.abs(rowHeight - stop[0]);
    if (diff < bestDiff) {
      best = stop;
      bestDiff = diff;
    }
  }
  return best[1];
}

export const ILITablePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const fontSize = options.fontSize ?? defaultOptions.fontSize;
  const showHeader = options.showHeader ?? defaultOptions.showHeader;
  const wordWrap = options.wordWrap ?? defaultOptions.wordWrap;
  const headerFontSize = options.headerFontSize ?? defaultOptions.headerFontSize;
  const rowHeight = options.rowHeight ?? defaultOptions.rowHeight;
  const cellPaddingX = options.cellPaddingX ?? defaultOptions.cellPaddingX;
  const zebraStripes = options.zebraStripes ?? defaultOptions.zebraStripes;
  const zebraColor = options.zebraColor ?? defaultOptions.zebraColor;

  const styles = getStyles();
  const tableClass = styles.table(
    fontSize,
    wordWrap,
    headerFontSize,
    rowHeight,
    cellPaddingX,
    zebraStripes,
    zebraColor
  );
  const cellHeight = useMemo(() => closestCellHeight(rowHeight), [rowHeight]);

  // Grafana liefert Query-Ergebnisse als DataFrames in data.series,
  // NICHT als data.tables (das Feld existiert in PanelData nicht).
  const frame = useMemo(() => {
    if (!data || !data.series || data.series.length === 0) {
      return undefined;
    }
    return data.series[0];
  }, [data]);

  if (!frame || frame.length === 0) {
    return <div className={styles.root}>Keine Daten</div>;
  }

  return (
    <div className={`${styles.root} ${tableClass}`}>
      {/* HINWEIS: Prüfe in deiner Grafana-Version (>=11.2), ob die Table-
          Komponente "noHeader" statt "showHeader" erwartet. Schau dazu in
          node_modules/@grafana/ui/dist/types/components/Table/... nach,
          oder probiere beide Varianten aus. */}
      <Table data={frame} width={width} height={height} noHeader={!showHeader} cellHeight={cellHeight} />
    </div>
  );
};

export default ILITablePanel;
