import * as React from 'react';
import { useState, useEffect } from 'react';
import ColorStopSlider from './components/ColorStopSlider';
import type { ISTOP } from './components/ColorStopSlider';
import Base from './Base';
import { ColorFormat } from './utils';
import GradientAngel from './components/GradientAngle';

const getDefaultStops = (format: ColorFormat) => {
  return [
    {
      color: format === 'rgb' ? 'rgb(212, 22, 22)' : '#ff0000',
      offset: 0
    },
    {
      color: format === 'rgb' ? 'rgb(255, 255, 255)' : '#ffffff',
      offset: 1
    }
  ]
};

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

export type LinearGradient = {
  colorStops: ISTOP[];
  angle: number;
}

type LinearGradientProps = {
  format?: ColorFormat;
  type?: 'linear' | 'radial';
  defaultValue?: LinearGradient;
  value?: LinearGradient;
  onChange?: (lg: LinearGradient) => void;
}

export default function LinearGradient (props: LinearGradientProps) {
  const { format = 'rgb', defaultValue, value, type = 'linear', onChange } = props;
  const defaultLinearGradientValue = {
    colorStops: getDefaultStops(format),
    angle: 90
  }
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

  const handleColorChange = (color: string) => {
    const index = gradient.colorStops.findIndex((item: ISTOP) => item === activeColorStop);
    const colorStop = {
      ...activeColorStop,
      color
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
    }
  }, [value]);

  useEffect(() => {
    if (gradient) {
      onChange && onChange(gradient);
    }
  }, [gradient]);

  return (
    <Base
      format={format}
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