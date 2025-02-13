import { getCookie, setCookie } from 'src/js/utils/cookies'
import proxyAnalyticsRequest from 'src/js/utils/proxyAnalyticsRequest'
import getMobileOperatingSystem from 'src/js/utils/getMobileOperatingSystem'

const COOKIE_NAMESPACE = 'ex_brave_campaign_2201'

/*
 * Example campaign links:
 * https://www.exodus.com/download/?utm_source=Brave&utm_campaign=growth_2022&utm_medium=Push0fee
 * https://www.exodus.com/download/?utm_source=Brave&utm_campaign=growth_2022&utm_medium=news_may
 * https://www.exodus.com/download/?utm_source=Brave&utm_campaign=growth_2022&utm_medium=SI_1
 *
 * utm_source=Brave
 * utm_campaign=growth_2022
 * utm_medium=Push0fee|news_may|SI_1|SI_2
 */

const processMediumUtm = (str) => {
  if (typeof str !== 'string') return null

  if (str.includes('Push0fee')) return 'push'
  if (str.includes('news_may')) return 'news'
  if (['SI_1', 'SI_2'].includes(str)) return 'image'

  return null
}

// according to the needs of this campaign as discussed with Kanan
const getPlatform = () => {
  const mobileOperatingSystem = getMobileOperatingSystem()

  if (mobileOperatingSystem === 'android') return 'android'
  if (mobileOperatingSystem === 'ios') return 'ios'

  return 'desktop'
}

const brave = ({ eventType }) => {
  const cookie = getCookie(COOKIE_NAMESPACE)

  const platform = getPlatform()

  if (cookie) {
    const cookieObj = JSON.parse(cookie)

    if (['download', 'app-store'].includes(eventType) && !cookieObj.downloadReqSent) {
      const medium = cookieObj.medium

      proxyAnalyticsRequest({
        ec: 'Growth_2022',
        ea: `Brave_2022${medium ? `_${medium}` : ''}`,
        el: `Download_${platform}`,
      })

      cookieObj.downloadReqSent = true

      setCookie({
        name: COOKIE_NAMESPACE,
        value: JSON.stringify(cookieObj),
        daysToPersist: 'forever',
      })
    }
  } else {
    const urlObject = new URL(window.location.href)

    const matchesNeeded = { utm_source: 'Brave', utm_campaign: 'growth_2022' }

    const matchesNeededCount = Object.keys(matchesNeeded).length
    let matchesFoundCount = 0
    for (const [paramKey, paramValue] of urlObject.searchParams.entries()) {
      for (const [matchKey, matchValue] of Object.entries(matchesNeeded)) {
        if (paramKey === matchKey && paramValue === matchValue) {
          matchesFoundCount++
        }
      }
    }

    const isMatch = matchesNeededCount === matchesFoundCount

    if (isMatch) {
      const medium = processMediumUtm(urlObject.searchParams.get('utm_medium'))

      proxyAnalyticsRequest({
        ec: 'Growth_2022',
        ea: `Brave_2022${medium ? `_${medium}` : ''}`,
        el: `Clickthrough_${platform}`,
      })

      const cookieObj = { medium }

      setCookie({
        name: COOKIE_NAMESPACE,
        value: JSON.stringify(cookieObj),
        daysToPersist: 'forever',
      })
    }
  }
}

export default brave
