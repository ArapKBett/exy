// dependencies.
import { useEffect, useState } from 'react'

const useClickOutside = (ref) => {
  const [isOutside, setIsOutside] = useState(false)

  useEffect(() => {
    /* prevent build from failing */
    if (typeof document === 'undefined') return

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setIsOutside(true)
      setIsOutside(false)
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref])

  return isOutside
}

export default useClickOutside
