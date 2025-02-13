import { useState, useEffect } from 'react'

import { OS_KEYS, PLATFORMS } from 'components/button/download-v2/constants'

const { desktop, extension, mobile } = PLATFORMS
const { web3, ios, android, win, mac, macMs, lin, linZip } = OS_KEYS

const PLATFORMS_MAPPING = [
  // MacOS Safari should come before iOS to avoid misdetection
  {
    os: mac,
    check: ({ userAgent, maxTouchPoints }) => {
      const isSafariBrowser = /Macintosh.*Version\/[\d.]+.*Safari/.test(userAgent)
      /**
       * On IOS 13 Apple made `userAgent` for Mac and iPad the same https://discussions.apple.com/thread/253513432?sortBy=rank.
       * `userAgent` string is not enough anymore to distinguish Mac vs iPad in Safari.
       *
       * Dev Note: Chrome emulator is not suitebale for testing this.
       * It shows wrong `userAgent` and `maxTouchPoints` is always 1.
       */
      const isDesktopDevice = maxTouchPoints === undefined || maxTouchPoints <= 2
      return isSafariBrowser && isDesktopDevice
    },
    platform: desktop,
  },
  // Android
  {
    os: android,
    check: ({ userAgent }) => /Android|SamsungBrowser/.test(userAgent),
    platform: mobile,
  },
  { os: android, check: ({ userAgent }) => /Linux.*Android/.test(userAgent), platform: mobile },
  // iOS & iPadOS.
  { os: ios, check: ({ userAgent }) => /iPhone|iPad|iPod/.test(userAgent), platform: mobile },
  { os: ios, check: ({ userAgent }) => /Macintosh.*CriOS/.test(userAgent), platform: mobile },
  {
    os: ios,
    check: ({ userAgent }) => /Macintosh.*Version\/[\d.]+.*Safari/.test(userAgent),
    platform: mobile,
  },
  // WebView on Android & iOS.
  { os: android, check: ({ userAgent }) => /wv|WebView/.test(userAgent), platform: mobile },
  {
    os: ios,
    check: ({ userAgent }) => /iPhone.*AppleWebKit.*Safari/.test(userAgent),
    platform: mobile,
  },
  // Surface.
  { os: win, check: ({ userAgent }) => /Windows.*Touch/.test(userAgent), platform: desktop },
  // Linux & MacOS.
  { os: lin, check: ({ userAgent }) => /Linux/.test(userAgent), platform: desktop },
  { os: mac, check: ({ userAgent }) => /Macintosh/.test(userAgent), platform: desktop },
  // Chrome OS & Windows.
  { os: web3, check: ({ userAgent }) => /CrOS/.test(userAgent), platform: extension },
  { os: win, check: ({ userAgent }) => /Windows/.test(userAgent), platform: desktop },
]

const VERSION_MAPPING = {
  macos: [
    { version: mac, regex: /Intel/ },
    { version: macMs, regex: /Apple/ },
  ],
  linux: [
    { version: lin, regex: /Debian|Ubuntu/ },
    { version: linZip, regex: /Zip/ },
  ],
}

const useDetectUserAgent = () => {
  const [userAgentInfo, setUserAgentInfo] = useState({ platform: '', os: '', version: '' })
  const [loading, setLoading] = useState(true)

  const detectPlatformAndOS = (userAgent, maxTouchPoints) => {
    const detected = PLATFORMS_MAPPING.find(({ check }) => check({ userAgent, maxTouchPoints }))
    return detected || 'unknown'
  }

  const detectVersion = (os, userAgent) => {
    const versionInfo = VERSION_MAPPING[os]?.find(({ regex }) => regex.test(userAgent))
    return versionInfo ? versionInfo.version : null
  }

  const handleSetUserAgentInfo = () => {
    const { userAgent, maxTouchPoints } = window.navigator
    const { platform, os } = detectPlatformAndOS(userAgent, maxTouchPoints)
    const version = detectVersion(os, userAgent)

    setUserAgentInfo({ platform, os: version || os })
    setLoading(false)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    handleSetUserAgentInfo()

    window.addEventListener('resize', handleSetUserAgentInfo)
    return () => {
      window.removeEventListener('resize', handleSetUserAgentInfo)
    }
  }, [])

  return {
    ...userAgentInfo,
    isDesktop: userAgentInfo.platform === desktop,
    isExtension: userAgentInfo.platform === extension,
    isMobile: userAgentInfo.platform === mobile,
    loading,
  }
}

export default useDetectUserAgent
