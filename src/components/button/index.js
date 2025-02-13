// dependencies.
import React from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames'

// Styles & Images:
import 'src/components/button/scss/style.scss'

// Partials:
const Wrapper = ({
  children,
  size,
  type,
  external,
  active,
  lightbox,
  disabled,
  target,
  style,
  to,
  onClick,
}) => {
  const enabledTo = external ? !disabled && { href: to } : !disabled && { to }

  const props = {
    className: classNames(
      'x__button-default',
      `x__button-default--${size}`,
      `x__button-default--${type}`,
      {
        'x__button-default--active': active,
        'x__button-default--disabled': disabled,
      }
    ),
    tabIndex: 0,
    ...(lightbox ? { 'data-fslightbox': true } : {}),
    disabled,
    style,
    onClick,
    children,
  }

  if (external) return <a {...enabledTo} {...props} target={target} />
  if (!to) return <button {...props} />
  return <Link {...enabledTo} {...props} />
}

const Copy = ({ data, effect, iconLeft, iconRight }) => (
  <span className="x__copy">
    {iconLeft && <i className={`x__copy__icon-left x__copy__icon-left--${effect}`}>{iconLeft}</i>}
    <span>{data}</span>
    {iconRight && (
      <i className={`x__copy__icon-right x__copy__icon-right--${effect}`}>{iconRight}</i>
    )}
  </span>
)

// Main component:
const Button = ({
  copy = 'Exodus button',
  iconLeft = null,
  iconRight = null,
  size = 'normal',
  type = 'primary',
  active = false,
  activeEffect = 'rotate',
  disabled = false,
  lightbox = false,
  target = '_self',
  style,
  to,
  onClick,
}) => {
  const external = (to && to.startsWith('https://')) || target === '_blank'
  const props = { to, size, type, external, active, lightbox, target, style, disabled, onClick }

  return (
    <Wrapper {...props}>
      <Copy data={copy} effect={activeEffect} iconLeft={iconLeft} iconRight={iconRight} />
    </Wrapper>
  )
}

export default Button
