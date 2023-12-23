---
sidebar_label: 纯色
---

本 Demo 演示一行文字的用法。

```jsx preview
import { Base } from 'react-colors';
import { useState } from 'react';

export default function App () {
  const [color, setColor] = useState('#000000');
  return (
    <div>
      <Base value={color} onChange={setColor} />
    </div>
  )
}
```
