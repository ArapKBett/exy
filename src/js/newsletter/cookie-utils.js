import { getCookie, setCookie } from 'js/utils/cookies'
import { isDev } from 'src/constants'

/* Related cookies
 * ex_subscribe / ex_subscribe_investor
 *  - set to "1" permanently if the user subscribes
 *  - set to "1" for 60 days if the user closes the notice
 *  - when set to "1" the notice will not be shown
 *
 * ex_subscribe_session / ex_subscribe_investor_session
 *  - set to "1" each time the notice is shown
 *  - when set to "1" the notice will not be shown
 *  - not permanent
 *  - the effect is to show the banner once per session, on the first page the user visits
 */

export const NEWSLETTER_VARIANTS = {
  investor: {
    cookieName: 'ex_subscribe_investor',
    cookieSessionName: 'ex_subscribe_investor_session',
  },
  product: {
    cookieName: 'ex_subscribe',
    cookieSessionName: 'ex_subscribe_session',
  },
}

function subscribeCookies(variant) {
  if (!variant || !Object.keys(NEWSLETTER_VARIANTS).includes(variant)) {
    return {
      isCookieNotSet: true,
      isSessionCookieNotSet: true,
    }
  }

  const cookieNameVariant = NEWSLETTER_VARIANTS[variant].cookieName
  const cookieSessionNameVariant = NEWSLETTER_VARIANTS[variant].cookieSessionName

  const isCookieNotSet = isDev ? true : getCookie(cookieNameVariant) !== '1'
  const isSessionCookieNotSet = isDev ? true : getCookie(cookieSessionNameVariant) === undefined

  const setSubscribeCloseCookie = () => {
    if (isCookieNotSet) setCookie({ name: cookieNameVariant, value: '1', daysToPersist: 60 })
  }
  const setSubscribeCookie = () => {
    if (isCookieNotSet) setCookie({ name: cookieNameVariant, value: '1' })
  }
  const setSubscribeCookieSession = () => {
    if (isSessionCookieNotSet) setCookie({ name: cookieSessionNameVariant, value: '1' })
  }

  return {
    isCookieNotSet,
    isSessionCookieNotSet,
    setSubscribeCloseCookie,
    setSubscribeCookie,
    setSubscribeCookieSession,
  }
}

export default subscribeCookies
