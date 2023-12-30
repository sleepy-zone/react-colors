---
sidebar_label: 使用选择器
sidebar_position: 1
---

# 

一个完整的例子，同时支持纯色、线性渐变、径向渐变选择。

1. 组件为完全受控模式
2. 线性渐变支持配置色标（color stop）和角度（渐变方向）
3. 径向渐变支持配置色标（color stop），暂不支持渐变中心配置

关于渐变，可以参考 [MDN CSS 渐变](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_images/Using_CSS_gradients)。

```jsx preview
import { ColorsPicker } from 'react-colors-beauty';
import { useState } from 'react';

export default function App () {
  const [value, setValue] = useState({ type: 'solid', color: 'rgba(212,22,22,0.8)' });

  const calcBackStyle = () => {
    switch(value?.type) {
      case 'solid':
        return value.color;
      case 'linear':
        return `linear-gradient(${value.gradient.angle}deg, ${value.gradient.colorStops.map(stop => `${stop.color} ${stop.offset * 100}%`)})`;
      case 'radial':
        return `radial-gradient(at 50% 50%, ${value.gradient.colorStops.map(stop => `${stop.color} ${stop.offset * 100}%`)})`;
      default:
        return '#fff';
    }
  } 

  return (
    <div
      style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', 
        height: 600,
        borderRadius: 8,
        background: calcBackStyle() 
      }}>
    <ColorsPicker value={value} onChange={(v) => { console.log(v); setValue(v) }}/>
    </div>
  )
}
```

## Props

| Name                | Type         | Default |  Description  |
|---------------------|--------------| ----------------------- |---------------------------------------------------------------------------|
| value               | `ColorsValue`  | |  ColorsValue 见下文 |                                                                     
| onChange | `(value: ColorsValue) => void` | | 颜色变化的回调 |
| format | `rgb` or `hex` | `rgb` | 返回的颜色格式 |
| angleType | `rotate` or `input` | `rotate` | 配置线性渐变角度，使用点击固定旋转角度还是输入精确角度 |
| defaultRotation | number | `45` | angleType 为 rotate 时，点击固定旋转角度的默认值 |

## ColorsValue

`type ColorsValue = { type: ColorType, color?: string, gradient?: LinearGradient }`

`type ColorType = 'solid' | 'linear' | 'radial';`

`type LinearGradient = {
  colorStops: ISTOP[];
  angle: number;
}`

`export type ISTOP = {
  color: string;
  offset: number;
}`