import * as React from 'react';
import { useState } from 'react';
import ColorTypeSelect from './ColorTypeSelect';
import type { ColorType } from './ColorTypeSelect';
import { InputNumber, Input } from './Input';
import { Color } from '@rc-component/color-picker';

type ColorInputProps = {
  value?: Color;
  onChange?: () => void;
}

export default function ColorInput (props: ColorInputProps) {
  const { value, onChange } = props;
  const [colorType, setColorType] = useState<ColorType>('HEX');

  const handleColorTypeChange = (t: ColorType) => {
    setColorType(t);
  }

  const handleHexChange = (e) => {
    console.log(e.target.value);
  } 

  const renderHexInput = () => {
    if (colorType === 'HEX') {
      const hv = value?.toHexString().replace('#', '');
      return (
        <div className="rcs-panel-input-type rcs-panel-input-hex">
          <Input value={hv} prefix="#" onChange={handleHexChange} />
        </div>
      )
    }
    return null;
  }

  const renderRGBInput = () => {
    if (colorType === 'RGB') {
      const rv = value?.toRgb();
      return (
        <div className="rcs-panel-input-type rcs-panel-input-rgb">
          <InputNumber value={rv?.r} min={0} max={255} />
          <InputNumber value={rv?.g} min={0} max={255} />
          <InputNumber value={rv?.b} min={0} max={255} />
        </div>
      )
    }
    return null;
  }

  const renderHSBInput = () => {
    if (colorType === 'HSB') {
      return (
        <div className="rcs-panel-input-type rcs-panel-input-hsb">
          <InputNumber min={0} max={360} />
          <InputNumber min={0} max={100} suffix="%" />
          <InputNumber min={0} max={100} suffix="%" />
        </div>
      )
    }
    return null;
  }

  const renderAlpha = () => {
    return (
      <div className="rcs-panel-input-alpha">
        <InputNumber suffix="%" style={{ width: 48 }} min={0} max={100} />
      </div>
    );
  }

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