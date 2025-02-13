import classNames from 'classnames'
import React, { forwardRef } from 'react'

import ExodusAppIconSvg from 'components/exodus-app-icon'
import Button from './button'
import IconCloseSvg from './icon-close'
import Rating from './rating'

import './banner.scss'

function Banner({ link, itemKey, onClose, tracker, show }, ref) {
  const isValidMobileLink = itemKey === 'ios' || itemKey === 'android'

  return (
    <div
      ref={ref}
      className={classNames('exodus__download__banner', { 'exodus__download__banner--show': show })}
    >
      <button className="exodus__download__banner__close" onClick={onClose}>
        <IconCloseSvg />
      </button>

      <ExodusAppIconSvg />

      <a
        className="exodus__download__banner__content"
        href={link}
        onClick={tracker}
        target="_blank"
      >
        <span
          className={classNames('exodus__download__banner__content__text', {
            'exodus__download__banner__content__text--centered': !isValidMobileLink,
          })}
        >
          <span>Exodus</span>
          {isValidMobileLink && <Rating itemKey={itemKey} />}
        </span>

        <Button className="exodus__download__banner__button">Download</Button>
      </a>
    </div>
  )
}

export default forwardRef(Banner)
