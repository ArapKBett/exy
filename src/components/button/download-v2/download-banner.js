import React, { useEffect, useRef, useState } from 'react'

import useDetectUserAgent from 'js/utils/hooks/use-detect-user-agent'
import useIsMounted from 'js/utils/hooks/useIsMounted'
import { useLatestVersion } from 'js/utils/hooks/useLatestVersion'

import { getCookie, setCookie } from 'js/utils/cookies'
import { PLATFORMS } from './constants'
import Banner from './parts/banner'
import buildDownloadItems from './utils/build-download-items'
import buildDownloadLinks from './utils/build-download-links'
import getLinkItem from './utils/get-link-item'

/*
 * Related cookies
 * ex_download_session
 *  - set to "1" each time DownloadBanner is shown
 *  - when set to "1" the notice will not be shown
 *  - not permanent
 *  - the effect is to show DownloadBanner once per session
 */
const isSessionCookieSet = getCookie('ex_download_session') === `1`

function DownloadBanner({
  location,
  pathname,
  platform,
  trackerPage,
  androidLinkProps = {},
  extensionLinkProps = {},
}) {
  const wrapperRef = useRef(null)
  const [show, setShow] = useState(false)

  const isMounted = useIsMounted()
  const releaseVersion = useLatestVersion().latest
  const { loading, platform: userAgentPlatform, os: userAgentOs } = useDetectUserAgent()

  const platformwithFallback = platform || userAgentPlatform
  const variant = platform ? platformwithFallback : userAgentOs

  const downloadLinks = buildDownloadLinks({
    variant,
    location: isMounted && location,
    referrer: isMounted && document?.referrer,
    version: releaseVersion,
    androidLinkProps,
    extensionLinkProps,
  })
  const items = buildDownloadItems(downloadLinks, trackerPage, pathname)
  const linkedItem = getLinkItem(items, variant)

  const handleCloseClick = () => {
    setShow(false)

    if (!isSessionCookieSet) {
      // If user closes the banner, prevent showing it again for a couple days.
      setCookie({ name: 'ex_download_session', value: '1', daysToPersist: 3 })
    }
  }

  useEffect(() => {
    if (typeof document === 'undefined' || !wrapperRef.current || isSessionCookieSet) return

    const showTimeout = setTimeout(() => {
      setShow(!isSessionCookieSet)
    }, 1000)

    return () => {
      clearTimeout(showTimeout)
    }
  }, [isSessionCookieSet, loading, wrapperRef])

  return (
    !loading && <Banner ref={wrapperRef} {...linkedItem} onClose={handleCloseClick} show={show} />
  )
}

export { PLATFORMS }

export default DownloadBanner
