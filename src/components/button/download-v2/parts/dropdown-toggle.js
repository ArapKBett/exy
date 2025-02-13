import classNames from 'classnames'
import { Link } from 'gatsby'
import React, { forwardRef } from 'react'

import { DOWNLOAD_PAGE_PATH } from 'src/constants'

import Button from './button'
import DropdownMenu from './dropdown-menu'
import IconCaretSvg from './icon-caret'
import LinkItem from './link-item'

import './dropdown-toggle.scss'

function Toggle(
  {
    label,
    link,
    tracker,
    Icon,
    items = [],
    className,
    menuOpen,
    onClick,
    showDisclaimer,
    showOtherDevicesLink,
    showDownloadPageButton,
    style,
  },
  ref
) {
  return (
    <div ref={ref} className="exodus__download__dropdown">
      <Button
        className={classNames('exodus__download__dropdown__button', {
          'exodus__download__dropdown__button--open': menuOpen,
          'exodus__download__dropdown__button--link': link,
          'exodus__download__dropdown__button--download-page': showDownloadPageButton,
          [className]: className,
        })}
        style={style}
        onClick={onClick}
      >
        {showDownloadPageButton ? (
          <LinkItem
            label="Download Exodus"
            link={DOWNLOAD_PAGE_PATH}
            className={className}
            target="_self"
          />
        ) : (
          <>
            <LinkItem
              label={label}
              link={link}
              onClick={tracker}
              Icon={Icon}
              className={className}
            />
            {!link && <IconCaretSvg />}
          </>
        )}
      </Button>
      {!!showOtherDevicesLink && (
        <Link className="exodus__download__dropdown__alternative" to={DOWNLOAD_PAGE_PATH}>
          Also available on other devices
        </Link>
      )}
      {!showDownloadPageButton && !link && (
        <DropdownMenu items={items} show={menuOpen} showDisclaimer={showDisclaimer} />
      )}
    </div>
  )
}

export default forwardRef(Toggle)
