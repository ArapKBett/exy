import classNames from 'classnames'
import { Link } from 'gatsby'
import React from 'react'

import { DOWNLOAD_URL } from 'src/constants'

import './download-button.scss'

function ConditionalWrapper({ children, className, href, onClick }) {
  const isExternal = href.startsWith('https://')
  const commonProps = {
    className,
    onClick,
    ...(isExternal ? { href, target: '_blank', rel: 'noopener' } : { to: href }),
  }
  const Component = isExternal ? 'a' : Link

  return <Component {...commonProps}>{children}</Component>
}

function DownloadButton({
  isMenuOpen,
  data = { title: 'Download', href: DOWNLOAD_URL, onClick: () => {} },
}) {
  const { title, href, onClick } = data

  return (
    <ConditionalWrapper
      href={href}
      className={classNames('x__download', { 'x__download--menu-open': isMenuOpen })}
      onClick={onClick}
    >
      {title}
    </ConditionalWrapper>
  )
}

export default DownloadButton
