---
sidebar_label: 纯色
---

本 Demo 演示一行文字的用法。

```jsx preview
import { ColorPicker } from '@sleepy/react-colors';
import { useState } from 'react';

export default function App () {
  const [color, setColor] = useState('#000000');
  return (
    <div>
      <ColorPicker onChange={console.log} />
    </div>
  )
}
```
