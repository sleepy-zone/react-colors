import * as React from 'react';
import { useEffect, useState } from 'react';
import ColorPicker from '@rc-component/color-picker';
import { Color, getColorStringByFormat, hasValue } from './utils';
import ColorInput from './components/ColorInput';
import type { ColorFormat } from './utils';
import PresetColors from './components/PresetColors';

import './rc-color-picker.less';
import './index.less';

export interface ComponentProps {
  format?: ColorFormat;
  value?: string | Color;
  onChange?: (value: string) => void;
  panelRender?: (panel: React.ReactElement) => React.ReactElement;
  [key: string]: any;
}

const handleColor = (c: string | Color) => {
  if (typeof c === 'string') return new Color(c);
  return c;
}

export default function Base(props: ComponentProps) {
  const { format = 'rgb', value, onChange, panelRender } = props;
  const [color, setColor] = useState<Color>();

  const handleChange = (v: Color) => {
    onChange && onChange(getColorStringByFormat(v, format));
  }

  const handlePresetChange = (v: string) => {
    const c = new Color(v);
    onChange && onChange(getColorStringByFormat(c, format));
  }

  useEffect(() => {
    if (hasValue(value)) {
      setColor(handleColor(value));
    }
  }, [value]);

  return (
    <ColorPicker
      value={color}
      onChange={handleChange}
      panelRender={(innerPanel: React.ReactElement) => {
        const panel = (
          <div className="rcs-panel rcs">
            {innerPanel}
            <ColorInput format={format} value={color} onChange={handleChange} />
            <PresetColors value={value} onChange={handlePresetChange}  />
          </div>
        );
        if (typeof panelRender === 'function') {
          return panelRender(panel);
        }
        return panel;
      }}
    />
  );
}
