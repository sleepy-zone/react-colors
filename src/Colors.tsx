import * as React from 'react';
import Base from './Base';
import Gradient from './Gradient';

export default function Colors () {
  return (
    <div className="rcs-all rcs">
      <div className="rcs-all-tab">
        <div className="rcs-all-type solid" title="纯色" />
        <div className="rcs-all-type linear" title="线性渐变" />
        <div className="rcs-all-type radial" title="径向渐变" />
      </div>
      <div>
        <Base />
      </div>
    </div>
  )
}