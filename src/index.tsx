import * as React from 'react';
import { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';

interface ComponentProps {
  value: string;
  onChange: any;
}

export default function ReactColors(props: ComponentProps) {
  const { value, onChange } = props;
  const [color, setColor] = useState();

  const handleChange = (v) => {
    console.log(v);
    setColor(v.rgb);
    onChange && onChange(v);
  }

  useEffect(() => {
    if (value) {
      setColor(value);
    }
  }, [value]);

  return (
    <SketchPicker color={color} onChangeComplete={handleChange} />
  );
}
