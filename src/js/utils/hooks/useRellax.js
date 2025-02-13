import { useEffect } from 'react'
import Rellax from 'rellax'

import usePrefersReducedMotion from './use-prefers-reduced-motion'

/*
 * Initialize Rellax plugin for elements with 'className'
 */
const useRellax = ({ ref = null, className = 'rellax', center = true, dependencies = [] }) => {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const rellax = Rellax(ref && ref.current ? ref.current : `.${className}`, { center })

    return () => {
      if (rellax) rellax.destroy()
    }
  }, [ref, className, center, prefersReducedMotion, ...dependencies])
}

export default useRellax
