---
sidebar_label: 渐变
---

```jsx preview
import { Gradient } from 'react-colors';
import { useState } from 'react';

export default function App () {
  const [value, setValue] = useState();
  return (
    <div>
      <Gradient value={value} onChange={setValue} />
    </div>
  )
}
```
