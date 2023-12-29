import * as React from 'react';
import { useState, useEffect } from 'react';
import ColorStopSlider from './components/ColorStopSlider';
import type { ISTOP } from './components/ColorStopSlider';
import Base from './Base';
import { ColorFormat } from './utils';
import GradientAngel from './components/GradientAngle';
import GradientAngelRotate from './components/GradientAngleRotate';

export const getDefaultLinearGradientValue = (format: ColorFormat) => {
  return {
    colorStops: [
      {
        color: format === 'rgb' ? 'rgb(212, 22, 22)' : '#ff0000',
        offset: 0
      },
      {
        color: format === 'rgb' ? 'rgb(255, 255, 255)' : '#ffffff',
        offset: 1
      }
    ],
    angle: 90
  }
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
  angleType?: 'input' | 'rotate'; 
  format?: ColorFormat;
  type?: 'linear' | 'radial';
  value?: LinearGradient;
  onChange?: (lg: LinearGradient) => void;
}

export default function LinearGradient (props: LinearGradientProps) {
  const { angleType = 'input', format = 'rgb', value, type = 'linear', onChange } = props;
  const defaultValue = getDefaultLinearGradientValue(format);
  const [gradient, setGradient] = useState(defaultValue);
  const [activeColorStop, setActiveColorStop] = useState<ISTOP>(defaultValue.colorStops[0]);

  const handleColorStopAdd = (stop: ISTOP) => {
    const colorStops: ISTOP[] = [...gradient.colorStops];
    colorStops.push(stop);
    sortListByOffset(colorStops);
    onChange?.({
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
      onChange?.({
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
      onChange?.({
        ...gradient,
        colorStops
      });
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
      onChange?.({
        ...gradient,
        colorStops
      });
      setActiveColorStop(colorStop);
    }
  }

  const handleAngleChange = (angle: number) => {
    onChange?.({
      ...gradient,
      angle
    });
  }

  const renderAngleInput = () => {
    if (angleType === 'input') {
      return (
        <GradientAngel
          angle={gradient?.angle}
          onChange={handleAngleChange}
        />
      )
    }
    if (angleType === 'rotate') {
      return (
        <GradientAngelRotate
          angle={gradient?.angle}
          onChange={handleAngleChange}
        />
      )
    }
    return null;
  }

  useEffect(() => {
    const active = gradient.colorStops.find(item => item === activeColorStop);
    if (!active) setActiveColorStop(gradient.colorStops[0]);
  }, [gradient]);

  useEffect(() => {
    if (value) {
      setGradient(value);
    } else {
      setGradient(defaultValue);
    }
  }, [value]);

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
              renderAngleInput()
              : null
            }
          </div>
          <div className="rcs-stop-info">
            <span className="rcs-stop-info-offset">offset: {Math.round((activeColorStop?.offset || 0) * 100)}%</span>
            {
              type === 'linear' && angleType === 'rotate' ?
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ lineHeight: 0 }}>
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6894" width="14px" height="14px"><path d="M526.048 866.88c2.432-49.92-8.224-91.552-31.552-125.952-24.896-36.704-63.264-63.68-116.224-80.96L203.2 866.88H526.08z m64.064 0h338.56v64H65.344L771.52 96l48.864 41.344-398.08 470.56c54.048 21.792 96 54.144 125.12 97.056 31.008 45.664 45.12 99.936 42.656 161.856z" fill="#707070" p-id="6895"></path></svg>
                </span>
                <span style={{ lineHeight: 0 }}>{gradient?.angle}°</span>
              </div> : null
            }
            <span className="rcs-stop-info-del" onClick={handleColorStopRemove}>
              <svg viewBox="64 64 896 896" focusable="false" width="14px" height="14px" fill="#707070" aria-hidden="true"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path></svg>
            </span>
          </div>
          {innerPanel}
        </div>
      )}
    />
  )
}