---
sidebar_label: 渐变
sidebar_position: 2
---

# 

你也可以单独单独使用渐变色选择。

```jsx preview
import { GradientColorPicker } from 'react-colors-beauty';
import { useState } from 'react';

export default function App () {
  const [value, setValue] = useState();
  return (
    <div>
      <GradientColorPicker value={value} onChange={(v) => { console.log(v); setValue(v) }} />
    </div>
  )
}
```

## Props

| Name                | Type         | Default |  Description  |
|---------------------|--------------| ----------------------- |---------------------------------------------------------------------------|
| value               | `LinearGradient`  | | |                                                                     
| onChange | `(lg: LinearGradient) => void` | | 渐变变化的回调 |
| type | `linear` or `radial` | `linear` | 渐变类型 |
| format | `rgb` or `hex` | `rgb` | 返回的颜色格式 |
| angleType | `rotate` or `input` | `rotate` | 配置线性渐变角度，使用点击固定旋转角度还是输入精确角度 |
| defaultRotation | number | `45` | angleType 为 rotate 时，点击固定旋转角度的默认值 |