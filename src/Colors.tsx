import * as React from 'react';
import { useState, useEffect } from 'react';
import Base from './Base';
import Gradient from './Gradient';
import type { LinearGradient } from './Gradient';
import { ColorFormat } from './utils';

type ColorType = 'solid' | 'linear' | 'radial';

type ColorsValue = { type: ColorType, color?: string, gradient?: LinearGradient };

export type ColorsProps = {
  format?: ColorFormat
  defaultValue?: ColorsValue;
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
  const { format = 'rgb', defaultValue, value, onChange } = props;
  const [type, setType] = useState<ColorType>('solid');
  const [innerValue, setInnerValue] = useState<ColorsValue>(defaultValue);

  const handleSolidChange = (color: string) => {
    const v: ColorsValue = { type: 'solid', color };
    setInnerValue(v);
    onChange?.(v);
  }

  const handleGradientChange = (gradient: LinearGradient, type: ColorType) => {
    const v: ColorsValue = { type, gradient };
    setInnerValue(v);
    onChange?.(v);
  }

  useEffect(() => {
    setInnerValue(null);
  }, [type]);

  useEffect(() => {
    onChange?.(innerValue);
  }, [innerValue]);

  useEffect(() => {
    if (value) {
      setInnerValue(value);
    }
  }, [value]);

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
          value={innerValue?.color}
          onChange={handleSolidChange}
        /> : null 
      }
      { 
        type === 'linear' ? 
        <Gradient
          format={format}
          type="linear"
          value={innerValue?.gradient}
          onChange={(v) => { handleGradientChange(v, 'linear') }}
        /> : null 
      }
      {
        type === 'radial' ? 
        <Gradient
          format={format}
          type="radial"
          value={innerValue?.gradient}
          onChange={(v) => { handleGradientChange(v, 'radial') }}
        /> : null }
    </div>
  )
}