import * as React from 'react';
import { useEffect, useState } from 'react';
import ColorPicker from '@rc-component/color-picker';
import { Color, getColorStringByFormat } from './utils';
import ColorInput from './components/ColorInput';
import type { ColorFormat } from './utils';

import './rc-color-picker.less';
import './index.less';

export { Color } from '@rc-component/color-picker';
export interface ComponentProps {
  format?: ColorFormat;
  defaultValue?: string | Color;
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
  const { format = 'rgb', defaultValue, value, onChange, panelRender } = props;
  const [color, setColor] = useState<Color>(handleColor(defaultValue));

  const handleChange = (v: Color) => {
    setColor(v);
    onChange && onChange(getColorStringByFormat(v, format));
  }

  useEffect(() => {
    if (value) {
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
            <ColorInput value={color} onChange={handleChange} />
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
