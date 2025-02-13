import React, { useRef, useState } from 'react'

import useDetectUserAgent from 'js/utils/hooks/use-detect-user-agent'
import useIsMounted from 'js/utils/hooks/useIsMounted'
import { useLatestVersion } from 'js/utils/hooks/useLatestVersion'
import useWindowEvent from 'js/utils/hooks/useWindowEvent'

import { PLATFORMS } from './constants'
import DropdownToggle from './parts/dropdown-toggle'
import getToggleItem from './utils/get-toggle-item'
import buildDownloadItems from './utils/build-download-items'
import buildDownloadLinks from './utils/build-download-links'

function DownloadButton({
  location,
  pathname,
  platform,
  trackerPage,
  androidLinkProps = {},
  extensionLinkProps = {},
  showOtherDevicesLink = true,
  style,
  onClick,
}) {
  const wrapperRef = useRef(null)
  const [toggleOpen, setToggleOpen] = useState(false)

  const isMounted = useIsMounted()
  const releaseVersion = useLatestVersion().latest
  const { loading, platform: userAgentPlatform, os: userAgentOs } = useDetectUserAgent()

  const platformwithFallback = platform || userAgentPlatform
  const shouldShowDisclaimer =
    platformwithFallback === PLATFORMS.desktop ||
    !Object.prototype.hasOwnProperty.call(PLATFORMS, platformwithFallback)

  // Should show dowload page button instead:
  const shouldShowDownloadPageButton = platform && platform !== userAgentPlatform

  const downloadLinks = buildDownloadLinks({
    variant: userAgentOs,
    location: isMounted && location,
    referrer: isMounted && document?.referrer,
    version: releaseVersion,
    androidLinkProps,
    extensionLinkProps,
  })
  const items = buildDownloadItems(downloadLinks, trackerPage, pathname)
  const toggleItem = getToggleItem({ items, os: userAgentOs })

  const handleToggleClick = () => {
    setToggleOpen((previousState) => !previousState)
    !!onClick && onClick()
  }

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      return setToggleOpen(false)
    }
  }

  useWindowEvent('mouseup', handleClickOutside, true)
  useWindowEvent('touched', handleClickOutside, true)

  return (
    !loading && (
      <DropdownToggle
        ref={wrapperRef}
        {...toggleItem}
        items={items}
        menuOpen={toggleOpen}
        showDisclaimer={shouldShowDisclaimer}
        showOtherDevicesLink={showOtherDevicesLink}
        showDownloadPageButton={shouldShowDownloadPageButton}
        style={style}
        onClick={handleToggleClick}
      />
    )
  )
}

export { PLATFORMS }

export default DownloadButton
