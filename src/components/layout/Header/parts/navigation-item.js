import { Link } from 'gatsby'
import React from 'react'

import './navigation-item.scss'

function buildIconName(string) {
  return string
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9- ]/g, '')
    .split(' ')
    .join('-')
}

/*
 * Wrapper:
 *  - Will return either an <a /> or <Link />, depending on the 'external' prop.
 *  - Must have attributes in order to work, can't pass them in the instance.
 */
const Wrapper = ({ children, className, href, onClick, target }) => {
  const isExternal = href && href.startsWith('https://')
  const commonProps = { children, className, onClick }

  if (isExternal) {
    return <a href={href} {...commonProps} target={target} />
  }
  return <Link to={href} {...commonProps} />
}

function NavigationItem({ href, name, title, description, onClick, target = '_self' }) {
  return (
    <Wrapper className="x__link" href={href} onClick={onClick} target={target}>
      <i className={`x__link__icon x__link__icon--${buildIconName(name)}`} />
      <span>
        <span className="x__link__title">{title}</span>
        <span className="x__link__description">{description}</span>
      </span>
    </Wrapper>
  )
}

export default NavigationItem
