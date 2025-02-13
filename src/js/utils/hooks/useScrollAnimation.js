import { useEffect } from 'react'

import useDimensions from 'src/js/utils/hooks/useDimensions'

const useScrollAnimation = ({
  refs = { current: [] },
  classNameToAdd = 'x-active',
  replay = false,
  disableOnMobile = false,
}) => {
  const { isMobile } = useDimensions()

  useEffect(() => {
    const handleScroll = () => {
      if (!refs.current || refs.current.length === 0) return

      refs.current.forEach((ref) => {
        if (disableOnMobile && isMobile) {
          ref.classList.add(classNameToAdd)
        } else {
          const rect = ref.getBoundingClientRect()
          const isVisible = rect && rect.top < window.innerHeight

          if (isVisible) ref.classList.add(classNameToAdd)
          else if (replay) ref.classList.remove(classNameToAdd)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [refs, classNameToAdd])
}

export default useScrollAnimation
