import { IOS_APP_URL } from 'src/constants'

const buildAppStoreLink = ({ location, ct }) => {
  const currentParams = new URLSearchParams(location?.search)
  const ctValue = currentParams.get('ct') || ct
  const baseUrl = IOS_APP_URL.split('?')[0]
  const existingParams = new URLSearchParams(IOS_APP_URL.split('?')[1])

  if (ctValue) {
    existingParams.set('ct', ctValue)
  }

  return `${baseUrl}?${existingParams.toString()}`
}

export default buildAppStoreLink
