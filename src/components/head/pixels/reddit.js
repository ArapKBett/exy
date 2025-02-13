import { useEffect } from 'react'

import { REDDIT_PIXEL_URL, REDDIT_PIXEL_ID } from 'src/constants'

const useRedditPixel = (url = REDDIT_PIXEL_URL, id = REDDIT_PIXEL_ID) => {
  useEffect(() => {
    if (window.rdt) return

    /* eslint-disable */
    !(function (w, d, e, v) {
      if (w.rdt) return

      var p = (w.rdt = function () {
        p.sendEvent ? p.sendEvent.apply(p, arguments) : p.callQueue.push(arguments)
      })
      p.callQueue = []

      var t = d.createElement(e)
      t.src = v
      t.async = !0

      var s = d.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(window, document, 'script', url)
    /* eslint-enable */

    if (!id) {
      console.warn('Reddit pixel: Please provide Reddit Advertiser ID for initializing')
    } else {
      /* eslint-disable no-undef */
      rdt('init', id)
      rdt('track', 'PageVisit')
      /* eslint-enable no-undef */
    }
  }, [url, id])
}

export default useRedditPixel
