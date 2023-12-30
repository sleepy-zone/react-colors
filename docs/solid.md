---
sidebar_label: 纯色
sidebar_position: 3
---

# 

你也可以单独单独使用纯色选择。

```jsx preview
import { ColorPicker } from 'react-colors-beauty';
import { useState } from 'react';

export default function App () {
  const [color, setColor] = useState('#000000');
  return (
    <div>
      <ColorPicker value={color} onChange={(v) => { setColor(v); console.log(v); }} />
    </div>
  )
}
```

## Props

| Name                | Type         | Default |  Description  |
|---------------------|--------------| ----------------------- |---------------------------------------------------------------------------|
| value               | `string`  | | |                                                                     
| onChange | `(color: string) => void` | | 颜色变化的回调 |
| type | `linear` or `radial` | `linear` | 渐变类型 |
| format | `rgb` or `hex` | `rgb` | 返回的颜色格式 |
| panelRender  | `(panel: React.ReactElement) => React.ReactElement` |  | 自定义渲染面板 |
