import { StylesCreator } from '@grafana/ui';

export const getStyles: StylesCreator = () => ({
  root: {
    overflow: 'auto',
    height: '100%',
  },
  table: (fontSize: string) => ({
    fontSize,
    borderCollapse: 'collapse',
    width: '100%',
    '& th, & td': {
      padding: '6px 10px',
      border: '1px solid var(--border-color)',
    },
    '& th': {
      backgroundColor: 'var(--panel-bg)',
      fontWeight: '600',
      textAlign: 'left',
    },
  }),
});
