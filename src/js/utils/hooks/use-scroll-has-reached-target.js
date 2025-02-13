import { useState, useEffect } from 'react'

function useScrollHasReachedTarget({ preventCondition = false, offset = 80 }) {
  const [scrollHasReachedTarget, setScrollHasReachedTarget] = useState(false)

  let c
  let currentScrollTop = 0

  const handleStretchOnScroll = () => {
    const scrollTop = document.documentElement.scrollTop

    if (!preventCondition) {
      currentScrollTop = scrollTop
      if (c < currentScrollTop && scrollTop > offset + offset / 2) {
        setScrollHasReachedTarget(true)
      } else if (scrollTop === 0) {
        setScrollHasReachedTarget(false)
      }
      c = currentScrollTop
    }
  }

  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') return

    window.addEventListener('scroll', handleStretchOnScroll)
    return () => window.removeEventListener('scroll', handleStretchOnScroll)
  }, [preventCondition])

  return scrollHasReachedTarget
}

export default useScrollHasReachedTarget
