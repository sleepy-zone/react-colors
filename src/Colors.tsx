import * as React from 'react';
import Base from './Base';
import Gradient, { getDefaultLinearGradientValue } from './Gradient';
import type { LinearGradient } from './Gradient';
import { ColorFormat } from './utils';

type ColorType = 'solid' | 'linear' | 'radial';

export type ColorsValue = { type: ColorType, color?: string, gradient?: LinearGradient };

export type ColorsProps = {
  defaultRotation?: number;
  angleType?: 'input' | 'rotate'; 
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
  const { angleType = 'rotate', format = 'rgb', value, onChange, defaultRotation } = props;

  const handleSolidChange = (color: string) => {
    const v: ColorsValue = { type: 'solid', color };
    onChange?.(v);
  }

  const handleGradientChange = (gradient: LinearGradient, type: ColorType) => {
    const v: ColorsValue = { type, gradient };
    onChange?.(v);
  }

  const handleTypeChange = (type: ColorType) => {
    const v: ColorsValue = {
      ...value,
      type,
    };
    if (type !== 'solid') {
      if (!v.gradient) v.gradient = getDefaultLinearGradientValue(format);
    }
    onChange?.(v);
  }

  return (
    <div className="rcs-all rcs">
      <div className="rcs-all-tab">
        {
          Types.map(item => (
            <div
              className={`rcs-all-type ${item.value} ${value?.type === item.value ? 'active' : ''}`}
              title={item.label}
              onClick={() => { handleTypeChange((item.value as ColorType)) }}
            />
          ))
        }
      </div>
      { 
        value?.type === 'solid' ? 
        <Base
          format={format}
          value={value?.color}
          onChange={handleSolidChange}
        /> : null 
      }
      { 
        value?.type === 'linear' ? 
        <Gradient
          angleType={angleType}
          format={format}
          type="linear"
          value={value?.gradient}
          onChange={(v) => { handleGradientChange(v, 'linear') }}
        /> : null 
      }
      {
        value?.type === 'radial' ? 
        <Gradient
          defaultRotation={defaultRotation}
          format={format}
          type="radial"
          value={value?.gradient}
          onChange={(v) => { handleGradientChange(v, 'radial') }}
        /> : null }
    </div>
  )
}