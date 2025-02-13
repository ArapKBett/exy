import classNames from 'classnames'
import React from 'react'

import './hamburger-button.scss'

function HamburgerButton({ isMenuOpen, onClick }) {
  return (
    <button
      className={classNames('x__hamburger', {
        'x__hamburger--menu-open': isMenuOpen,
      })}
      onClick={onClick}
      type="button"
    >
      Menu
      <span />
      <span />
      <span />
    </button>
  )
}

export default HamburgerButton
