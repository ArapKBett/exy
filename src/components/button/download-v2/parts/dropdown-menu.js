import React from 'react'

import { TERMS_URL, PRIVACY_URL } from 'src/constants'

import LinkItem from './link-item'
import getOsIcon from '../utils/get-os-icon'

import './dropdown-menu.scss'
import classNames from 'classnames'

function DisclaimerText() {
  return (
    <span className="exodus__download__menu__disclaimer">
      By downloading Exodus, you agree to the{' '}
      <a target="_blank" href={TERMS_URL}>
        Terms of Service
      </a>{' '}
      and{' '}
      <a target="_blank" href={PRIVACY_URL}>
        Privacy Policy
      </a>
    </span>
  )
}

function DropdownMenu({ items = [], show = false, showDisclaimer = false }) {
  if (!items.length) {
    return null
  }

  return (
    <div
      className={classNames('exodus__download__menu', {
        'exodus__download__menu--open': show,
      })}
    >
      <ul>
        {items.map(({ label, link, key, tracker }) => (
          <li key={key}>
            <LinkItem
              className={`exodus__download__link--menu exodus__download__link--${key}`}
              itemKey={key}
              label={label}
              link={link}
              onClick={tracker}
              Icon={getOsIcon[key]}
            />
          </li>
        ))}
      </ul>

      {!!showDisclaimer && <DisclaimerText />}
    </div>
  )
}

export default DropdownMenu
