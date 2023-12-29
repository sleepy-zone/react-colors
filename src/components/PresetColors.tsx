import * as React from 'react';
import { Color } from '../utils';

const colors = [
  '#9AC1F0', '#72FA93', '#A0E548', '#E45F2B', '#F6C445',
  '#93AEC1', '#9DBDBA', '#F8B042', '#EC6A52', '#F3B7AD',
  '#BD9E84', '#C5DFDF', '#E68815', '#A71666', '#D31638',
  '#45496A', '#7D8BAE', '#E5857B', '#F1B2B2', '#E8CCC7',
  '#F8A57F', '#FAD4A6', '#FBE7AB', '#45958E', '#B7BDA0',
  '#8B86BE', '#86ABBA'
];

type PresetColorsProps = {
  value?: string;
  onChange?: (v: string) => void;
  presetColors?: string[]
}

export default function PresetColors (props: PresetColorsProps) {
  const { value, onChange, presetColors = colors } = props;
  const c = value ? new Color(value) : null;

  return (
    <div className="rcs-preset-colors">
      {
        presetColors.map((color: string) => (
          <div
            className="rsc-preset-color"
            style={{ 
              background: color,
              borderColor: color === c?.toHexString?.()?.toUpperCase?.() ? 'rgba(0,0,0,.25)' : 'transparent'
            }} 
            onClick={() => { onChange?.(color) }}
          />
        ))
      }
    </div>
  )
}