import React from 'react';
import { PanelProps } from '@grafana/data';
import { ColorPicker, InlineField, Input, Switch, VerticalGroup } from '@grafana/ui';
import { PanelOptions } from '../types';

interface Props extends PanelProps<PanelOptions> {}

export const PanelEditor: React.FC<Props> = ({ options, onOptionsChange }) => {
  return (
    <VerticalGroup spacing="md">
      <InlineField label="Font size (content)" labelWidth={18}>
        <Input
          type="text"
          value={options.fontSize}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            onOptionsChange({ ...options, fontSize: Number(e.currentTarget.value) || 12 })
          }
          placeholder="z. B. 12"
          width={20}
        />
      </InlineField>

      <InlineField label="Font size (header)" labelWidth={18}>
        <Input
          type="text"
          value={options.headerFontSize}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            onOptionsChange({ ...options, headerFontSize: Number(e.currentTarget.value) || 13 })
          }
          placeholder="z. B. 13"
          width={20}
        />
      </InlineField>

      <InlineField label="Show header" labelWidth={18}>
        <Switch
          checked={options.showHeader ?? true}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            onOptionsChange({ ...options, showHeader: e.currentTarget.checked })
          }
        />
      </InlineField>

      <InlineField label="Word wrap" labelWidth={18}>
        <Switch
          checked={options.wordWrap ?? false}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            onOptionsChange({ ...options, wordWrap: e.currentTarget.checked })
          }
        />
      </InlineField>

      <InlineField label="Row height (px)" labelWidth={18}>
        <Input
          type="text"
          value={options.rowHeight}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            onOptionsChange({ ...options, rowHeight: Number(e.currentTarget.value) || 36 })
          }
          placeholder="z. B. 36"
          width={20}
        />
      </InlineField>

      <InlineField label="Cell padding X (px)" labelWidth={18}>
        <Input
          type="text"
          value={options.cellPaddingX}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            onOptionsChange({ ...options, cellPaddingX: Number(e.currentTarget.value) || 8 })
          }
          placeholder="z. B. 8"
          width={20}
        />
      </InlineField>

      <InlineField label="Zebra stripes" labelWidth={18}>
        <Switch
          checked={options.zebraStripes ?? false}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            onOptionsChange({ ...options, zebraStripes: e.currentTarget.checked })
          }
        />
      </InlineField>

      {options.zebraStripes && (
        <InlineField label="Zebra color" labelWidth={18}>
          <ColorPicker
            color={options.zebraColor ?? 'rgba(127, 127, 127, 0.12)'}
            onChange={(color: string) => onOptionsChange({ ...options, zebraColor: color })}
          />
        </InlineField>
      )}
    </VerticalGroup>
  );
};
