import { useEffect } from 'react'

import { TWITTER_PIXEL_URL, TWITTER_PIXEL_ID } from 'src/constants'

function useTwitterPixel(url = TWITTER_PIXEL_URL, id = TWITTER_PIXEL_ID) {
  useEffect(() => {
    if (window.twq) return

    /* eslint-disable */
    !(function (e, t, n, s, u, a) {
      e.twq ||
        ((s = e.twq =
          function () {
            s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments)
          }),
        (s.version = '1.1'),
        (s.queue = []),
        (u = t.createElement(n)),
        (u.async = !0),
        (u.src = url),
        (a = t.getElementsByTagName(n)[0]),
        a.parentNode.insertBefore(u, a))
    })(window, document, 'script')
    /* eslint-enable */

    if (!id) {
      console.warn(`Twitter pixel: Please provide Twitter Pixel's ID for initializing`)
    } else {
      /* eslint-disable no-undef */
      twq('config', id)
      /* eslint-enable no-undef */
    }
  }, [url, id])
}

export default useTwitterPixel

export function trackTwitterEvent(eventId) {
  if (window.twq) {
    window.twq('event', eventId, {})
  } else {
    console.warn('Twitter pixel is not initialized')
  }
}
