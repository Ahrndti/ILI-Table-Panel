export interface PanelOptions {
  fontSize: number;
  showHeader: boolean;
  wordWrap: boolean;
  headerFontSize: number;
  rowHeight: number;
  cellPaddingX: number;
  zebraStripes: boolean;
  zebraColor: string;
}

export const defaultOptions: PanelOptions = {
  fontSize: 12,
  showHeader: true,
  wordWrap: false,
  headerFontSize: 13,
  rowHeight: 36,
  cellPaddingX: 8,
  zebraStripes: false,
  zebraColor: 'rgba(127, 127, 127, 0.12)',
};
