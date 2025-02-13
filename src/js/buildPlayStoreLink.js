import { ANDROID_APP_URL } from 'src/constants'

const buildPlayStoreLink = ({ location, referrer, utmSource, utmContent, utmCampaign }) => {
  const currentParams = new URLSearchParams(location?.search)
  const urlParams = new URLSearchParams()
  const utmSourceValue = currentParams.get('utm_source') || utmSource
  const utmContentValue = currentParams.get('utm_content') || utmContent
  const utmCampaignValue = currentParams.get('utm_campaign') || utmCampaign

  if (utmSourceValue) {
    urlParams.set('utm_source', utmSourceValue)
  }
  if (utmContentValue) {
    urlParams.set('utm_content', utmContentValue)
  }
  if (utmCampaignValue) {
    urlParams.set('utm_campaign', utmCampaignValue)
  }
  if (referrer) {
    urlParams.set('referrer', referrer)
  }

  const urlParamsStr = urlParams
    ? `&referrer=${urlParams.toString().replace(/=/g, '%3D').replace(/&/g, '%26')}`
    : ''

  return `${ANDROID_APP_URL}${urlParamsStr}`
}

export default buildPlayStoreLink
