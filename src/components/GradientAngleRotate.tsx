import * as React from 'react';

type GradientAngelProps = {
  angle: number,
  onChange: (angle: number) => void;
}

export default function GradientAngelRotate (props: GradientAngelProps) {
  const { angle, onChange } = props;

  const rotateAngle = () => {
    let newAngle = angle + 45;
    if (newAngle > 360) newAngle = newAngle % 360;
    onChange?.(newAngle);
  }

  return (
    <div className="rcs-angle" onClick={rotateAngle} title="顺时针旋转渐变, 步长为15">
      <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 15C10 22.2989 14.103 28.5832 20 31.4081C22.1347 32.4307 24.5046 33 27 33C36.3888 33 44 24.9411 44 15" stroke="#ff2222" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/><path d="M18 20L10 15L4 23" stroke="#ff2222" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/></svg>
    </div>
  )
}