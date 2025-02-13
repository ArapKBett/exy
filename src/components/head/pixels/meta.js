import { useEffect } from 'react'

import { META_PIXEL_URL, META_PIXEL_ID } from 'src/constants'

function useMetaPixel(url = META_PIXEL_URL, id = META_PIXEL_ID) {
  useEffect(() => {
    if (window.fbq) return

    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return

      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }

      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = !0
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = !0
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(window, document, 'script', url)
    /* eslint-enable */

    if (!id) {
      console.warn(`Meta pixel: Please provide Meta Pixel's ID for initializing`)
    } else {
      /* eslint-disable no-undef */
      fbq('init', id)
      fbq('track', 'PageView')
      /* eslint-enable no-undef */
    }
    // Fallback if js fails
    // <noscript>
    //   <img height="1" width="1" style="display:none" src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`} />
    // </noscript>
  }, [url, id])
}

export default useMetaPixel
