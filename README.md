[![Version](https://img.shields.io/npm/v/react-colors-beauty.svg?style=flat-square&logo=npm)&nbsp;
![Downloads](https://img.shields.io/npm/dm/react-colors-beauty.svg?style=flat-square&logo=npm)&nbsp;
![Total downloads](https://img.shields.io/npm/dt/react-colors-beauty?style=flat-square&logo=npm)](https://www.npmjs.com/package/react-colors-beauty)

# react-colors-beauty

颜色选择器，同时支持纯色和渐变色选择。

<p>
  <img src="https://raw.githubusercontent.com/sleepy-zone/react-colors/main/assets/shot.png" />
</p>

## Install

```bash
$ npm i react-colors-beauty --save
```

```bash
$ yarn add react-colors-beauty
```

## Basic Example

```js
import { useState } from 'react';
import { ColorsPicker } from 'react-colors-beauty';

import 'react-colors-beauty/esm/index.less';

export default function App () {
  const [value, setValue] = useState({ type: 'solid', color: 'rgb(0,0,0)' });
  <ColorsPicker value={value} onChange={setValue} />
}
```