[![Npm Version][npm-version-image]][npm-version-url]
[![Downloads][downloads-image]][downloads-url]
[![License][license-image]][license-url]

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

export default function App () {
  const [value, setValue] = useState({ type: 'solid', color: 'rgb(0,0,0)' });
  <ColorsPicker value={value} onChange={setValue} />
}
```