import * as React from 'react';
import { InputNumber } from './Input';

type GradientAngelProps = {
  angle: number,
  onChange: (angle: number) => void;
}

export default function GradientAngel (props: GradientAngelProps) {
  const { angle, onChange } = props;

  const rotateAngle = (newAngle: number) => {
    onChange?.(newAngle);
  }

  return (
    <div className="rcs-angle" onClick={rotateAngle} title="顺时针旋转渐变, 步长为10">
      <InputNumber
        min={0}
        max={360}
        suffix="°"
        style={{ width: 48 }}
        value={angle}
        onChange={rotateAngle}
      />
    </div>
  )
}