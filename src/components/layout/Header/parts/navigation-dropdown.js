import classNames from 'classnames'
import React from 'react'

import DropdownMenu from './dropdown-menu'

import './navigation-dropdown.scss'

function NavigationDropdown({ label, items, colIndex, onItemClick, onToggleClick, open = false }) {
  return (
    <li
      className={classNames('x__navigation-dropdown', {
        'x__navigation-dropdown--open': open,
      })}
    >
      <span onClick={onToggleClick} tabIndex={0}>
        {label}
      </span>

      <DropdownMenu colName={colIndex} items={items} open={open} onClick={onItemClick} />
    </li>
  )
}

export default NavigationDropdown
