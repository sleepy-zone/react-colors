---
sidebar_label: 用法
---

本 Demo 演示一行文字的用法。

```jsx preview
import ReactColors from 'react-colors';
import styles from './usage.module.css';
import noop from './usage.js';
import { useState } from 'react';

export default function App () {
  const [color, setColor] = useState('#000000');
  return (
    <div className={styles.usageContainer}>
      <ReactColors value={color} onChange={setColor} />
    </div>
  )
}
```
