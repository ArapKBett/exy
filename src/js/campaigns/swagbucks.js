import { isDev, SWAGBUCKS_URL } from 'src/constants'
import { getCookie, setCookie } from 'src/js/utils/cookies'

const COOKIE_NAMESPACE = 'ex_swagbucks_campaign'

const swagbucks = ({ eventType }) => {
  const cookie = getCookie(COOKIE_NAMESPACE)

  if (cookie) {
    const cookieObj = JSON.parse(cookie)

    if (['download', 'app-store'].includes(eventType) && !cookieObj.downloadReqSent) {
      const tid = cookieObj.tid
      const url = isDev ? SWAGBUCKS_URL : '/swagbucks'
      const getParams = `?transaction_id=${tid}`

      fetch(`${url}/${getParams}`).catch((err) => console.log(err))

      cookieObj.downloadReqSent = true

      setCookie({ name: COOKIE_NAMESPACE, value: JSON.stringify(cookieObj) })
    }
  } else {
    const tid = new URL(window.location.href).searchParams.get('tid')

    if (tid) {
      const cookieObj = { tid }

      setCookie({ name: COOKIE_NAMESPACE, value: JSON.stringify(cookieObj) })
    }
  }
}

export default swagbucks
