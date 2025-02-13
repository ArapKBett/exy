import { useEffect } from 'react'

/*
 * Scroll to anchor when `condition` becomes truthy.
 * Useful for scrolling to an anchor link that is
 * not rendered straight away on page load.
 */
function useScrollToAnchor(condition, id = false, offset = 0) {
  useEffect(() => {
    /* prevent build from failing */
    if (typeof window === 'undefined') return

    if (condition) {
      try {
        id = id || window.location.hash.substring(1)
        const target = document.getElementById(id)
        const targetPosition = target.getBoundingClientRect().top
        const offsetPosition = targetPosition + window.scrollY - offset

        if (target) window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
      } catch (err) {}
    }
  }, [condition, id])
}

export default useScrollToAnchor
