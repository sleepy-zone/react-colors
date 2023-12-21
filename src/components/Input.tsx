import * as React from 'react';
import RcInputNumber from 'rc-input-number';
import RcInput from 'rc-input';
import type { InputNumberProps } from 'rc-input-number';
import type { InputProps } from 'rc-input';

import 'rc-input/assets/index.css';
import 'rc-input-number/assets/index.css';

export const InputNumber = (props: InputNumberProps) => {
  return (
    <RcInputNumber prefixCls="rc-input-number" controls={false}  {...props} />
  );
}

export const Input = (props: InputProps) => {
  return (
    <RcInput prefixCls="rc-input" {...props} />
  );
}

export { ValueType } from 'rc-input-number';