import { useEffect, useRef, useState } from 'react'

import getUserAgentInfo from 'utils/getUserAgentInfo'

const useDetectIosAppInstalled = () => {
  const [maybeShowingBanner, setMaybeShowingBanner] = useState(false)

  const originalHeight = useRef(0)
  const { isIOS, isSafari } = getUserAgentInfo()

  useEffect(() => {
    if (typeof window === 'undefined' || !isIOS || !isSafari) return

    originalHeight.current = window.outerHeight

    const checkHeight = () => {
      const heightDiff = originalHeight.current - window.innerHeight
      setMaybeShowingBanner(heightDiff >= 250) // 250 is the height of the iOS banner plus searchbar and other screen elements that get added.
    }

    setTimeout(() => {
      checkHeight()
    }, 50)
  }, [])

  return maybeShowingBanner
}

export default useDetectIosAppInstalled
