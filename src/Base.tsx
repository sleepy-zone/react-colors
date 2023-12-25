import * as React from 'react';
import { useEffect, useState } from 'react';
import ColorPicker from '@rc-component/color-picker';
import { Color } from '@rc-component/color-picker';
import ColorInput from './components/ColorInput';

import './rc-color-picker.less';
import './index.less';
export interface ComponentProps {
  defaultValue?: string | Color;
  value?: string | Color;
  onChange?: (color: Color) => void;
  panelRender?: (panel: React.ReactElement) => React.ReactElement;
  [key: string]: any;
}

const handleColor = (c: string | Color) => {
  if (typeof c === 'string') return new Color(c);
  return c;
}

export default function Base(props: ComponentProps) {
  const { defaultValue, value, onChange, panelRender } = props;
  const [color, setColor] = useState<Color>(handleColor(defaultValue));

  const handleChange = (v: Color) => {
    setColor(v);
    onChange && onChange(v);
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
