# react-colors-beauty

颜色选择器，同时支持纯色和渐变色选择。

<p>
  <img src="https://raw.githubusercontent.com/sleepy-zone/react-colors/main/assets/usage.png" />
</p>

## Install

```bash
$ npm i react-colors-beauty --save
```

## Usage

```js
import { ColorsPicker } from 'react-colors-beauty';
import { useState } from 'react';

export default function App () {
  const [value, setValue] = useState();
  <ColorsPicker value={value} onChange={setValue} />
}
```