import * as React from 'react';
import { useEffect, useState } from 'react';
import ColorPicker from '@rc-component/color-picker';
import { Color } from '@rc-component/color-picker';
import ColorInput from './components/ColorInput';

import './rc-color-picker.less';
import './index.less';

export type ColorsChangeEventHandler = (
  color: Color
) => void;

export interface ComponentProps {
  defaultValue?: string | Color;
  value?: string | Color;
  onChange?: ColorsChangeEventHandler;
  [key: string]: any;
}

export default function ReactColors(props: ComponentProps) {
  const { defaultValue, value, onChange } = props;
  const [color, setColor] = useState<Color>();

  const handleChange = (v: Color) => {
    setColor(v);
    console.log(v, v.toHexString());
    onChange && onChange(v);
  }

  return (
    <ColorPicker
      value={color}
      onChange={handleChange}
      panelRender={(innerPanel: React.ReactElement) => (
        <div className="rcs-panel">
          <div>
            {innerPanel}
            <ColorInput value={color} />
          </div>
        </div>
      )}
    />
  );
}
