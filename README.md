# react-colors

颜色选择器，同时支持纯色和渐变色选择。

<p>
  <img src="https://raw.githubusercontent.com/sleepy-zone/react-colors/main/assets/usage.png" />
</p>

## Install

```bash
$ npm i @sleepy/react-colors --save
```

## Usage

```js
import { ColorsPicker } from '@sleepy/react-colors';
import { useState } from 'react';

export default function App () {
  <ColorsPicker value={value} onChange={setValue} />
}
```