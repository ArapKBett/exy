import classNames from 'classnames'
import { Link } from 'gatsby'
import React from 'react'

import Rating from './rating'

import './link-item.scss'

function ConditionalWrapper({ children, className, href, target, onClick }) {
  const isExternal = href?.startsWith('https://')
  const commonProps = {
    className,
    onClick,
    ...(href
      ? {
          target,
          ...(target === '_blank' ? { rel: 'noopener' } : {}),
          ...(isExternal ? { href } : { to: href }),
        }
      : {}),
  }
  const Component = href ? (isExternal ? 'a' : Link) : 'button'

  return <Component {...commonProps}>{children}</Component>
}

function LinkItem({ className, label, link: href, target = '_blank', onClick, itemKey, Icon }) {
  const isMobileItem = itemKey === 'ios' || itemKey === 'android'

  const wrapperProps = {
    className: classNames('exodus__download__link', className),
    href,
    target,
    onClick,
  }

  return (
    <ConditionalWrapper {...wrapperProps}>
      <i>{Icon}</i>
      {label}
      {isMobileItem && <Rating itemKey={itemKey} starColor="#18192D" starRating />}
    </ConditionalWrapper>
  )
}

export default LinkItem
