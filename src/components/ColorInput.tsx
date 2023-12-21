import * as React from 'react';
import { useState, useEffect } from 'react';
import ColorTypeSelect from './ColorTypeSelect';
import type { ColorType } from './ColorTypeSelect';
import { InputNumber, Input } from './Input';
import type { ValueType } from './Input';
import { Color } from '@rc-component/color-picker';
import { getIntColorValue } from '../utils';
import type { RGB, HSB } from '@rc-component/color-picker';

type ColorInputProps = {
  value?: Color;
  onChange?: (color: Color) => void;
}

export default function ColorInput (props: ColorInputProps) {
  const { value, onChange } = props;
  const [colorType, setColorType] = useState<ColorType>('HEX');
  const [hexValue, setHexValue] = useState('');
  const [rgbValue, setRgbValue] = useState<RGB>();
  const [hsbValue, setHsbValue] = useState<HSB>();

  const handleColorTypeChange = (t: ColorType) => {
    setColorType(t);
  }

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setHexValue(v);
    if (v?.length === 6) {
      const color = new Color(v);
      if (color.isValid) {
        onChange && onChange(color);
      }
    }
  } 

  const renderHexInput = () => {
    if (colorType === 'HEX') {
      return (
        <div className="rcs-panel-input-type rcs-panel-input-hex">
          <Input value={hexValue} prefix="#" onChange={handleHexChange} />
        </div>
      )
    }
    return null;
  }

  const handleRgbChange = (v: ValueType, key: string) => {
    const rgb = { ...rgbValue, [key]: v };
    const color = new Color(rgb);
    if (color.isValid) {
      onChange && onChange(color);
    }
  }

  const renderRGBInput = () => {
    if (colorType === 'RGB') {
      return (
        <div className="rcs-panel-input-type rcs-panel-input-rgb">
          <InputNumber value={rgbValue?.r} min={0} max={255} onChange={(v) => { handleRgbChange(v, 'r') }} />
          <InputNumber value={rgbValue?.g} min={0} max={255} onChange={(v) => { handleRgbChange(v, 'g') }} />
          <InputNumber value={rgbValue?.b} min={0} max={255} onChange={(v) => { handleRgbChange(v, 'b') }} />
        </div>
      )
    }
    return null;
  }

  const handleHsbChange = (v: ValueType, key: string) => {
    const hsb = {
      ...hsbValue,
      [key]: v
    };
    hsb.b = (hsb.b as number) / 100;
    hsb.s = (hsb.s as number) / 100;

    const color = new Color(hsb);
    if (color.isValid) {
      onChange && onChange(color);
    }
  }

  const renderHSBInput = () => {
    if (colorType === 'HSB') {
      return (
        <div className="rcs-panel-input-type rcs-panel-input-hsb">
          <InputNumber value={hsbValue.h} min={0} max={360} className="rc-input-number-affix-wrapper" onChange={(v) => { handleHsbChange(v, 'h') }} />
          <InputNumber value={hsbValue.s} min={0} max={100} suffix="%" onChange={(v) => { handleHsbChange(v, 's') }} />
          <InputNumber value={hsbValue.b} min={0} max={100} suffix="%" onChange={(v) => { handleHsbChange(v, 'b') }} />
        </div>
      )
    }
    return null;
  }

  const renderAlpha = () => {
    const alpha = value?.roundA;
    return (
      <div className="rcs-panel-input-alpha">
        <InputNumber suffix="%" style={{ width: 48 }} min={0} max={100} value={alpha * 100} />
      </div>
    );
  }

  useEffect(() => {
    if (value) {
      setHexValue(value.toHexString().replace('#', ''));
      setRgbValue(value.toRgb());
      const hsb = value.toHsb();
      setHsbValue({
        h: getIntColorValue(hsb.h),
        s: getIntColorValue(hsb.s, true),
        b: getIntColorValue(hsb.b, true)
      });
    }
  }, [value]);

  return (
    <div className="rcs-panel-input">
      <ColorTypeSelect value={colorType} onChange={handleColorTypeChange} />
      <div className="rcs-panel-input-types">
        {renderHexInput()}
        {renderRGBInput()}
        {renderHSBInput()}
      </div>
      {renderAlpha()}
    </div>
  );
}