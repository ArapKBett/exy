import { useRef, useEffect } from 'react'

// source: https://blog.logrocket.com/accessing-previous-props-state-react-hooks/

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

export default usePrevious
