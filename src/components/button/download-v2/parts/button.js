import classNames from 'classnames'
import React from 'react'

import './button.scss'

function Button({ children, className, style, onClick }) {
  const props = {
    className: classNames('exodus__download__button', className),
    style,
    ...(onClick && { onClick }),
  }
  return <span {...props}>{children}</span>
}

export default Button
