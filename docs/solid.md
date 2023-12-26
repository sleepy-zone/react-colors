---
sidebar_label: 纯色
sidebar_position: 3
---

# 

你也可以单独单独使用纯色选择。

```jsx preview
import { ColorPicker } from '@sleepy/react-colors';
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
