---
sidebar_label: 渐变
---

```jsx preview
import { LinearGradient } from 'react-colors';
import { useState } from 'react';

export default function App () {
  const [value, setValue] = useState();
  return (
    <div>
      <LinearGradient value={value} onChange={setValue} />
    </div>
  )
}
```
