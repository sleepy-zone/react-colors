---
sidebar_label: 使用
---

```jsx preview
import { ColorsPicker } from '@sleepy/react-colors';
import { useState } from 'react';

export default function App () {
  return (
    <div>
      <ColorsPicker onChange={console.log}/>
    </div>
  )
}
```
