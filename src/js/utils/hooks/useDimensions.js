// dependencies.
import { useEffect, useState } from 'react'

// main function.
const useDimensions = (bpNumber) => {
  // states.
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
    isDesktop: false,
    isMobile: false,
    isTablet: false,
    breakpoint: false,
  })

  // on resize update dimensions.
  const handleResize = () => {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
      isDesktop: window.innerWidth >= 1170,
      isMobile: window.innerWidth <= 768,
      isTablet: window.innerWidth > 768 && window.innerWidth < 1170,
      breakpoint: bpNumber ? window.innerWidth <= bpNumber : false,
    })
  }

  useEffect(() => {
    // prevent build from failing.
    if (typeof window === 'undefined') return
    // call once to set initial dimensions.
    handleResize()

    // event listeners.
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return dimensions
}

export default useDimensions
