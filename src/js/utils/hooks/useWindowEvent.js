import { useEffect } from 'react'

const useWindowEvent = (event, callback, useCapture = false) => {
  useEffect(() => {
    /* prevent build from failing */
    if (typeof window === 'undefined') return

    window.addEventListener(event, callback, useCapture)
    return () => window.removeEventListener(event, callback, useCapture)
  }, [event, callback, useCapture])
}

export default useWindowEvent
