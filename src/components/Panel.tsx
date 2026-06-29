import React, { useMemo } from 'react';
import { PanelProps } from '@grafana/data';
import { Table } from '@grafana/ui';
import { PanelOptions, defaultOptions } from '../types';
import { getStyles } from './styles';

interface Props extends PanelProps<PanelOptions> {}

export const ILITablePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const fontSize = options.fontSize ?? defaultOptions.fontSize;
  const showHeader = options.showHeader ?? defaultOptions.showHeader;
  const wordWrap = options.wordWrap ?? defaultOptions.wordWrap;

  const styles = getStyles();
  const tableClass = styles.table(fontSize, wordWrap);

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
      <Table data={frame} width={width} height={height} noHeader={!showHeader} />
    </div>
  );
};

export default ILITablePanel;
