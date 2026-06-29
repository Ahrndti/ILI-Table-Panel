import React from 'react';
import { PanelProps } from '@grafana/data';
import { InlineField, Input, Switch, VerticalGroup } from '@grafana/ui';
import { PanelOptions } from '../types';

interface Props extends PanelProps<PanelOptions> {}

export const PanelEditor: React.FC<Props> = ({ options, onOptionsChange }) => {
  return (
    <VerticalGroup spacing="md">
      <InlineField label="Font size (content)" labelWidth={18}>
        <Input
          type="text"
          value={options.fontSize}
          onChange={(e) =>
            onOptionsChange({ ...options, fontSize: e.target.value || '12px' })
          }
          placeholder="z. B. 12px"
          width={20}
        />
      </InlineField>

      <InlineField label="Show header" labelWidth={18}>
        <Switch
          checked={options.showHeader ?? true}
          onChange={(e) => onOptionsChange({ ...options, showHeader: e.target.checked })}
        />
      </InlineField>

      <InlineField label="Word wrap" labelWidth={18}>
        <Switch
          checked={options.wordWrap ?? false}
          onChange={(e) => onOptionsChange({ ...options, wordWrap: e.target.checked })}
        />
      </InlineField>
    </VerticalGroup>
  );
};
