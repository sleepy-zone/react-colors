---
sidebar_label: 渐变
---

```jsx preview
import { GradientColorPicker } from '@sleepy/react-colors';
import { useState } from 'react';

export default function App () {
  const [value, setValue] = useState();
  return (
    <div>
      <GradientColorPicker value={value} onChange={setValue} />
    </div>
  )
}
```
