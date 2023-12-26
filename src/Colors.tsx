import * as React from 'react';
import { useState, useEffect } from 'react';
import Base, { getDefaultColorValue } from './Base';
import Gradient, { getDefaultLinearGradientValue } from './Gradient';
import type { LinearGradient } from './Gradient';
import { ColorFormat } from './utils';

type ColorType = 'solid' | 'linear' | 'radial';

type ColorsValue = { type: ColorType, color?: string, gradient?: LinearGradient };

export type ColorsProps = {
  format?: ColorFormat
  value?: ColorsValue;
  onChange?: (v: ColorsValue) => void;
}

const Types = [
  {
    label: '纯色',
    value: 'solid'
  },
  {
    label: '线性渐变',
    value: 'linear'
  },
  {
    label: '径向渐变',
    value: 'radial'
  }
]

export default function Colors (props: ColorsProps) {
  const { format = 'rgb', value, onChange } = props;
  const [type, setType] = useState<ColorType>('solid');

  const handleSolidChange = (color: string) => {
    const v: ColorsValue = { type: 'solid', color };
    onChange?.(v);
  }

  const handleGradientChange = (gradient: LinearGradient, type: ColorType) => {
    const v: ColorsValue = { type, gradient };
    onChange?.(v);
  }

  useEffect(() => {
    const v: ColorsValue = {
      ...value,
      type,
    };
    if (type === 'solid') {
      delete v.gradient;
      if (!v.color) v.color = getDefaultColorValue(format);
    } else {
      delete v.color;
      if (!v.gradient) v.gradient = getDefaultLinearGradientValue(format);
    }
    onChange?.(v);
  }, [type]);

  return (
    <div className="rcs-all rcs">
      <div className="rcs-all-tab">
        {
          Types.map(item => (
            <div
              className={`rcs-all-type ${item.value} ${type === item.value ? 'active' : ''}`}
              title={item.label}
              onClick={() => { setType((item.value as ColorType)) }}
            />
          ))
        }
      </div>
      { 
        type === 'solid' ? 
        <Base
          format={format}
          value={value?.color}
          onChange={handleSolidChange}
        /> : null 
      }
      { 
        type === 'linear' ? 
        <Gradient
          format={format}
          type="linear"
          value={value?.gradient}
          onChange={(v) => { handleGradientChange(v, 'linear') }}
        /> : null 
      }
      {
        type === 'radial' ? 
        <Gradient
          format={format}
          type="radial"
          value={value?.gradient}
          onChange={(v) => { handleGradientChange(v, 'radial') }}
        /> : null }
    </div>
  )
}