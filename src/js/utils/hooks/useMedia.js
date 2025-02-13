import { useEffect, useState } from 'react'

const useMedia = (mediaQueryString, initialMatches = false) => {
  const [matches, setMatches] = useState(initialMatches)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueryString)

    setMatches(mediaQueryList.matches)

    const listener = (event) => {
      setMatches(event.matches)
    }

    mediaQueryList.addListener(listener)

    return () => {
      mediaQueryList.removeListener(listener)
    }
  }, [mediaQueryString])

  return matches
}

export default useMedia
