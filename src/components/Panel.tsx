import React, { useMemo } from 'react';
import { PanelProps } from '@grafana/data';
import { Table } from '@grafana/ui';
import { PanelOptions, defaultOptions } from '../types';
import { getStyles } from './styles';

interface Props extends PanelProps<PanelOptions> {}

const ILITablePanel: React.FC<Props> = ({ options, data }) => {
  const fontSize = options.fontSize || defaultOptions.fontSize;
  const showHeader = options.showHeader ?? defaultOptions.showHeader;
  const wordWrap = options.wordWrap ?? defaultOptions.wordWrap;

  const styles = getStyles();
  const tableStyle = styles.table(fontSize);

  const rows = useMemo(() => {
    if (!data || !data.tables || data.tables.length === 0) {
      return [];
    }

    const table = data.tables[0];
    if (!table || !table.columns || table.columns.length === 0) {
      return [];
    }

    return table.rows.map((row, idx) => {
      const obj: Record<string, any> = {};
      table.columns.forEach((col, i) => {
        obj[col.label || `col${i}`] = row[i];
      });
      return { id: idx, ...obj };
    });
  }, [data]);

  const columns = useMemo(() => {
    if (!data || !data.tables || data.tables.length === 0) {
      return [];
    }

    const table = data.tables[0];
    return table.columns.map((col) => ({
      Header: col.label || 'Unknown',
      accessor: col.label || 'col',
      Cell: ({ cell }: { cell: { value: any } }) => {
        const content = String(cell.value ?? '');
        return wordWrap ? <div style={{ whiteSpace: 'pre-wrap' }}>{content}</div> : content;
      },
    }));
  }, [data, wordWrap]);

  return (
    <div className={styles.root}>
      <Table
        className={tableStyle}
        columns={columns}
        data={rows}
        showHeader={showHeader}
        variant="compact"
      />
    </div>
  );
};

export default ILITablePanel;
