import * as React from 'react';
import { useMemo, useRef, useEffect } from 'react';

export type ISTOP = {
  color: string;
  offset: number;
}

interface ColorStopSliderProps {
  colorStop: ISTOP;
  colorStops: ISTOP[];
  colorStopAdd?: (stop: ISTOP) => void;
  colorStopUpdate?: (stop:ISTOP) => void;
  colorStopRemove?: () => void;
  onColorStopChange?: (stop: ISTOP) => void;
}

export default function ColorStopSlider (props: ColorStopSliderProps) {
  const { colorStop, colorStops, colorStopAdd, colorStopUpdate, colorStopRemove, onColorStopChange } = props;
  const colorStopDragRef = useRef({
    enable: false,
    lastX: 0
  });

  const calcStopStyle = (stop: ISTOP) => {
    const style: React.CSSProperties = {
      left: `${stop.offset * 100}%`,
      backgroundColor: stop.color
    }
    if (stop.offset === 0) {
      style.transform = 'translate(-1px, -50%)';
    }
    if (stop.offset === 1) {
      style.transform = 'translate(calc(-100% + 1px), -50%)';
    }
    if (stop === colorStop) {
      style.width = '10px';
      style.height = '10px';
    }
    return style;
  }

  const handleMainClick = (e: React.MouseEvent) => {
    if (colorStopDragRef.current.enable) return;
    const offset = e.nativeEvent.offsetX / (e.target as HTMLDivElement).clientWidth;
    colorStopAdd?.({ color: '#ff2222', offset });
  }

  const removeStop = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (key === 'delete' || key === 'backspace') {
      colorStopRemove?.();
    }
  }

  const handleStopMouseDown = (stop: ISTOP, e: React.MouseEvent) => {
    e.stopPropagation();
    colorStopDragRef.current.enable = true;
    colorStopDragRef.current.lastX = e.clientX;
    onColorStopChange(stop);
  }

  const handleStopMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (colorStopDragRef.current.enable) {
      const offset = colorStop.offset + (e.clientX - colorStopDragRef.current.lastX) / e.target.parentNode.clientWidth;
      colorStopDragRef.current.lastX = e.clientX;
      colorStopUpdate({
        ...colorStop,
        offset
      });
    }
  }

  const handleStopMouseUp = () => {
    colorStopDragRef.current.enable = false;
  }

  const mainStyle = useMemo(() => {
    return {
      background: `linear-gradient(90deg, ${colorStops.map(stop => `${stop.color} ${stop.offset * 100}%`)})`
    }
  }, [colorStops]);

  useEffect(() => {
    document.addEventListener('keydown', removeStop);
    document.addEventListener('mouseup', handleStopMouseUp);
    document.addEventListener('mousemove', handleStopMouseMove);
    return () => {
      document.removeEventListener('keydown', removeStop);
      document.removeEventListener('mouseup', handleStopMouseUp);
      document.removeEventListener('mousemove', handleStopMouseMove);
    }
  }, [colorStop, colorStops]);

  return (
    <div className="rcs-slider">
      <div className="rcs-slider-main" style={mainStyle} onClick={handleMainClick}>
      {
        colorStops.map(stop => (
          <div
            className="rcs-slider-stop"
            style={calcStopStyle(stop)}
            onClick={(e) => { e.stopPropagation(); }}
            onMouseDown={(e) => { handleStopMouseDown(stop, e); }}
          />
        ))
      }
      </div>
    </div>
  )
}