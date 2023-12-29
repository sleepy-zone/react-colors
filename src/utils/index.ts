import { Color } from '@rc-component/color-picker';

export type ColorFormat = 'rgb' | 'hex';
export { Color } from '@rc-component/color-picker';

export const getIntColorValue = (v: number, isPercent = false) => {
  if (!v) {
    return v;
  }
  if (!isPercent) {
    return Math.round(v);
  }
  return Math.round(v * 100);
}

export const getColorStringByFormat = (color: Color, format: ColorFormat) => {
  if (!color) return '';
  if (format === 'hex') {
    if (color.getAlpha() === 1) return color.toHexString();
    return color.toHex8String();
  }
  if (format === 'rgb') {
    return color.toRgbString();
  }
  return '';
}

export const hasValue = (v: any) => {
  return v !== undefined;
}

export const getOffset = (num: number) => {
  if (num >= 1) num = 1;
  if (num <= 0) num = 0;
  return Math.round(num * 100) / 100;
}