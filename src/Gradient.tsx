import * as React from 'react';
import { useState, useEffect } from 'react';
import ColorStopSlider from './components/ColorStopSlider';
import type { ISTOP } from './components/ColorStopSlider';
import Base from './Base';
import { Color } from '@rc-component/color-picker';
import GradientAngel from './components/GradientAngle';

const defaultStops = [
  {
    color: '#ff0000',
    offset: 0
  },
  {
    color: '#ffffff',
    offset: 1
  }
];

const defaultLinearGradientValue = {
  colorStops: defaultStops,
  angle: 90
}

const sortListByOffset = (list: ISTOP[]) => {
  list.sort((a, b) => {
    if (a.offset > b.offset) {
      return 1;
    }
    if (a.offset < b.offset) {
      return -1;
    }
    return 0;
  });
}

const handleStopOffset = (offset: number) => {
  if (offset <= 0) return 0;
  if (offset >= 1) return 1;
  return offset;
}

type LinearGradient = {
  colorStops: ISTOP[];
  angle: number;
}

type LinearGradientProps = {
  type: 'linear' | 'radial';
  defaultValue?: LinearGradient;
  value?: LinearGradient;
  onChange?: (lg: LinearGradient) => void;
}

export default function LinearGradient (props: LinearGradientProps) {
  const { defaultValue, value, type = 'linear', onChange } = props;
  const _defaultValue = defaultValue || defaultLinearGradientValue;
  const [gradient, setGradient] = useState(_defaultValue);
  const [activeColorStop, setActiveColorStop] = useState<ISTOP>(_defaultValue.colorStops[0]);

  const handleColorStopAdd = (stop: ISTOP) => {
    const colorStops: ISTOP[] = [...gradient.colorStops];
    colorStops.push(stop);
    sortListByOffset(colorStops);
    setGradient({
      ...gradient,
      colorStops
    });
    setActiveColorStop(stop);
  }

  const handleColorStopUpdate = (stop: ISTOP) => {
    const _stop = {
      ...stop,
      offset: handleStopOffset(stop.offset)
    }
    const colorStops: ISTOP[] = [...gradient.colorStops];
    const index = gradient.colorStops.findIndex((item: ISTOP) => item === activeColorStop);
    if (index !== -1) {
      colorStops.splice(index, 1, _stop);
      sortListByOffset(colorStops);
      setGradient({
        ...gradient,
        colorStops
      });
      setActiveColorStop(_stop);
    }
  }

  const handleColorStopRemove = () => {
    if (gradient.colorStops.length <= 2) return;
    const index = gradient.colorStops.findIndex((item: ISTOP) => item === activeColorStop);
    if (index !== -1) {
      const colorStops: ISTOP[] = [...gradient.colorStops];
      colorStops.splice(index, 1);
      setGradient({
        ...gradient,
        colorStops
      });
      setActiveColorStop(colorStops[0]);
    }
  }

  const handleColorChange = (color: Color) => {
    const index = gradient.colorStops.findIndex((item: ISTOP) => item === activeColorStop);
    const colorStop = {
      ...activeColorStop,
      color: color.toHex8String()
    };
    if (index !== -1) {
      const colorStops: ISTOP[] = [...gradient.colorStops];
      colorStops.splice(index, 1, colorStop);
      setGradient({
        ...gradient,
        colorStops
      });
      setActiveColorStop(colorStop);
    }
  }

  const handleAngleChange = (angle: number) => {
    setGradient({
      ...gradient,
      angle
    });
  }

  useEffect(() => {
    if (value) {
      setGradient(value);
      const s = value.colorStops.find((item: ISTOP) => item === activeColorStop);
      if (!s) {
        setActiveColorStop(value.colorStops[0]);
      }
    }
  }, [value]);

  useEffect(() => {
    onChange && onChange(gradient);
  }, [gradient]);

  return (
    <Base
      value={activeColorStop?.color}
      onChange={handleColorChange}
      panelRender={(innerPanel) => (
        <div className="rcs-gradient rcs">
          <div className="rcs-gradient-header">
            <ColorStopSlider
              colorStop={activeColorStop}
              colorStops={gradient?.colorStops}
              colorStopAdd={handleColorStopAdd}
              colorStopRemove={handleColorStopRemove}
              onColorStopChange={setActiveColorStop}
              colorStopUpdate={handleColorStopUpdate}
            />
            {
              type === 'linear' ?
              <GradientAngel
                angle={gradient?.angle}
                onChange={handleAngleChange}
              /> : null
            }
          </div>
          {innerPanel}
        </div>
      )}
    />
  )
}