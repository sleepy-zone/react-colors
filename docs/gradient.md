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
      <GradientColorPicker angleType="rotate" value={value} onChange={(v) => { console.log(v); setValue(v) }} />
    </div>
  )
}
```
