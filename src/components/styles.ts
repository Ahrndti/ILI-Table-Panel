import { css } from '@emotion/css';

export const getStyles = () => ({
  root: css`
    height: 100%;
    width: 100%;
    overflow: hidden;
  `,
  // Die @grafana/ui Table-Komponente rendert ihre Zellen intern und nimmt
  // keine Klassen pro Zelle entgegen. Daher setzen wir die Schriftgröße
  // über einen vererbten CSS-Selektor auf den Container und überschreiben
  // damit die Schriftgröße aller Tabellenzellen darunter.
  table: (fontSize: number, wordWrap: boolean) => css`
    & div[role='table'],
    & div[role='row'],
    & div[role='cell'],
    & [class*='cell'] {
      font-size: ${fontSize}px !important;
      white-space: ${wordWrap ? 'pre-wrap' : 'nowrap'} !important;
    }
  `,
});
