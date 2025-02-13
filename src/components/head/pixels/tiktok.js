import { useEffect } from 'react'

import { TIKTOK_PIXEL_URL, TIKTOK_PIXEL_ID } from 'src/constants'

const useTikTokPixel = (url = TIKTOK_PIXEL_URL, id = TIKTOK_PIXEL_ID) => {
  useEffect(() => {
    if (window.ttq) return

    /* eslint-disable */
    !(function (w, d, t, v) {
      w.TiktokAnalyticsObject = t
      var ttq = (w[t] = w[t] || [])
      ;(ttq.methods = [
        'page',
        'track',
        'identify',
        'instances',
        'debug',
        'on',
        'off',
        'once',
        'ready',
        'alias',
        'group',
        'enableCookie',
        'disableCookie',
      ]),
        (ttq.setAndDefer = function (t, e) {
          t[e] = function () {
            t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
          }
        })
      for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i])
      ;(ttq.instance = function (t) {
        for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)
          ttq.setAndDefer(e, ttq.methods[n])
        return e
      }),
        (ttq.load = function (e, n) {
          var i = v
          ;(ttq._i = ttq._i || {}),
            (ttq._i[e] = []),
            (ttq._i[e]._u = i),
            (ttq._t = ttq._t || {}),
            (ttq._t[e] = +new Date()),
            (ttq._o = ttq._o || {}),
            (ttq._o[e] = n || {})
          var o = document.createElement('script')
          ;(o.type = 'text/javascript'), (o.async = !0), (o.src = i + '?sdkid=' + e + '&lib=' + t)
          var a = document.getElementsByTagName('script')[0]
          a.parentNode.insertBefore(o, a)
        })
    })(window, document, 'ttq', url)
    /* eslint-enable */

    if (!id) {
      console.warn(`TikTok pixel: Please provide TikTok Pixel's ID for initializing`)
    } else {
      /* eslint-disable no-undef */
      ttq.load(id)
      ttq.page()
      /* eslint-enable no-undef */
    }
  }, [url, id])
}

export default useTikTokPixel
