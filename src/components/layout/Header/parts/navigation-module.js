import classNames from 'classnames'
import { Link } from 'gatsby'
import React, { useCallback, useRef, useState } from 'react'

import SocialNetworks from 'components/layout/shared/social-networks'
import useDimensions from 'js/utils/hooks/useDimensions'
import useWindowEvent from 'js/utils/hooks/useWindowEvent'
import NavigationDropdown from './navigation-dropdown'

import './navigation-module.scss'

function MobileHomeLink({ onClick }) {
  return (
    <li className="x__navigation-dropdown x__navigation-dropdown--home">
      <Link to="/" onClick={onClick}>
        Home
      </Link>
    </li>
  )
}

function MobileSocialNetworks() {
  return (
    <li className="x__navigation-dropdown x__navigation-dropdown--social">
      <SocialNetworks filterItems={['facebook', 'twitter', 'instagram', 'youTube']} navigation />
    </li>
  )
}

function ModuleNavigation({
  background = 'primary',
  data = [],
  isMenuOpen = false,
  showSocialNetworks = false,
  onChange,
}) {
  const navigationRef = useRef(null)

  const defaultState = data.map(() => false)
  const [columnOpen, setColumnOpen] = useState(defaultState)

  const { isMobile } = useDimensions()

  const handleItemClick = () => {
    onChange(setColumnOpen(defaultState))
  }

  const handleOutsideClick = (e) => {
    if (navigationRef.current && !navigationRef.current.contains(e.target)) {
      setColumnOpen(defaultState)
    }
  }

  const handleToggleClick = useCallback((index) => {
    setColumnOpen((prevOpen) => {
      if (prevOpen[index] !== !prevOpen[index]) {
        const newOpen = [...prevOpen]
        newOpen[index] = !prevOpen[index]
        return newOpen.map((openCol, i) => (i === index ? newOpen[i] : false))
      }
      return prevOpen
    })
  }, [])

  useWindowEvent('mouseup', handleOutsideClick, true)
  useWindowEvent('touched', handleOutsideClick, true)

  if (!data || data.length === 0) return null

  return (
    <menu
      ref={navigationRef}
      className={classNames(`x__navigation x__navigation--${background}`, {
        'x__navigation--menu-open': isMenuOpen,
        'x__navigation--social': showSocialNetworks,
      })}
    >
      <ul>
        {isMobile && <MobileHomeLink onClick={handleItemClick} />}
        {data.map(({ column, items }, index) => (
          <NavigationDropdown
            key={index}
            colIndex={index}
            items={items}
            label={column}
            open={columnOpen[index]}
            onItemClick={handleItemClick}
            onToggleClick={() => handleToggleClick(index)}
          />
        ))}
        {showSocialNetworks && <MobileSocialNetworks />}
      </ul>
    </menu>
  )
}

export default ModuleNavigation
