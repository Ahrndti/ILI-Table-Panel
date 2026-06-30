import { css } from '@emotion/css';

export const getStyles = () => ({
  root: css`
    height: 100%;
    width: 100%;
    overflow: hidden;
  `,
  // Die @grafana/ui Table-Komponente rendert ihre Zellen intern (inkl.
  // virtualisierter Zeilenliste via react-window) und nimmt keine Klassen
  // pro Zelle/Zeile von außen entgegen. Daher setzen wir Schriftgröße,
  // Zeilenhöhe, Zellabstand und Zebra-Schattierung über vererbte
  // CSS-Selektoren auf den Container.
  //
  // WICHTIG zur Zeilenhöhe: @grafana/ui berechnet die Höhe einer Zeile auch
  // intern (für die virtualisierte Scroll-Liste). Die hier per CSS gesetzte
  // `rowHeight` überschreibt nur die SICHTBARE Höhe. Über die Panel-Option
  // "Zeilenhöhe (px)" wird zusätzlich die nächstliegende offizielle
  // Grafana-Stufe (sm/md/lg, siehe Panel.tsx) als `cellHeight`-Prop an die
  // <Table> übergeben, damit die intern reservierte Zeilenhöhe möglichst
  // nah am CSS-Wert liegt. Bei sehr stark abweichenden Werten kann es bei
  // langen, scrollbaren Tabellen trotzdem zu kleinen optischen Lücken
  // zwischen den Zeilen kommen – für die typische ILI-Audit-Tabelle (wenige
  // bis mittelviele Zeilen) ist das in der Praxis nicht relevant.
  table: (
    fontSize: number,
    wordWrap: boolean,
    headerFontSize: number,
    rowHeight: number,
    cellPaddingX: number,
    zebraStripes: boolean,
    zebraColor: string
  ) => css`
    /* Tabelleninhalt (Body-Zellen) */
    & div[role='table'],
    & div[role='cell'],
    & [class*='cell'] {
      font-size: ${fontSize}px !important;
      white-space: ${wordWrap ? 'pre-wrap' : 'nowrap'} !important;
    }

    /* Spaltenüberschriften (Header-Zellen) */
    & div[role='columnheader'] {
      font-size: ${headerFontSize}px !important;
    }

    /* Horizontaler Zellabstand links/rechts (wirkt sich auf die effektive
       Spalten-/Zeilenbreite aus) */
    & div[role='cell'],
    & div[role='columnheader'] {
      padding-left: ${cellPaddingX}px !important;
      padding-right: ${cellPaddingX}px !important;
    }

    /* Zeilenhöhe: betrifft sowohl Body- als auch Header-Zeilen */
    & div[role='row'] {
      height: ${rowHeight}px !important;
      min-height: ${rowHeight}px !important;
    }
    & div[role='cell'],
    & div[role='columnheader'] {
      height: ${rowHeight - 1}px !important;
      min-height: ${rowHeight - 1}px !important;
    }

    /* Zebra-Streifen: jede zweite Body-Zeile abdunkeln.
       Body-Zeilen tragen (anders als der Header) kein eigenes role='row',
       sondern sind die Item-Divs der intern von @grafana/ui verwendeten
       react-window-Liste. Als stabiler Ankerpunkt dient das von Grafana
       selbst vergebene data-testid des Body-Containers
       ("data-testid table body", seit Grafana 10.2). Die genaue
       Verschachtelungstiefe der virtualisierten Liste kann sich zwischen
       Grafana-Versionen leicht unterscheiden (zusätzliche Scroll-/Sizer-
       Wrapper von react-window), daher werden hier mehrere plausible
       Tiefen abgedeckt – nicht zutreffende Selektoren greifen einfach
       nicht. */
    ${zebraStripes
      ? css`
          & div[data-testid='data-testid table body'] > div > div > div:nth-of-type(even),
          & div[data-testid='data-testid table body'] > div > div:nth-of-type(even) {
            background-color: ${zebraColor};
          }
        `
      : ''}
  `,
});
