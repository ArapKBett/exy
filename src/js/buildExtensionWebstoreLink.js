import { INSTALL_EXTENSION_URL } from 'src/constants'

const buildExtensionWebstoreLink = ({ location, referrer, utmSource, utmContent, utmCampaign }) => {
  const currentParams = new URLSearchParams(location?.search)
  const urlParams = new URLSearchParams()
  const utmSourceValue = currentParams.get('utm_source') || utmSource
  const utmContentValue = currentParams.get('utm_content') || utmContent
  const utmCampaignValue = currentParams.get('utm_campaign') || utmCampaign

  if (utmSourceValue) {
    urlParams.set('utm_source', utmSourceValue)
  }
  if (utmCampaignValue) {
    urlParams.set('utm_campaign', utmCampaignValue)
  }
  if (utmContentValue) {
    urlParams.set('utm_content', utmContentValue)
  }
  if (referrer) {
    urlParams.set('referrer', referrer)
  }

  return `${INSTALL_EXTENSION_URL}?${urlParams.toString()}`
}

export default buildExtensionWebstoreLink
