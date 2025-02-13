import { MOBILE_PRIVATE_ASSETS, MOBILE_WALLET_BASE_ASSETS } from '../available/mobile'
import { WEB3_WALLET_BASE_ASSETS, WEB3_WALLET_PRIVATE_ASSETS } from '../available/web3'
import { DESKTOP_WALLET_BASE_ASSETS, DESKTOP_WALLET_PRIVATE_ASSETS } from '../available/desktop'
import assert from 'minimalistic-assert'

const arrayIncludes = (arr, key) => {
  assert(arr, 'arr is required')
  assert(key, 'key is required')
  return arr.includes(key)
}

export const getIsOld = (asset) => {
  return !!asset?.old
}
const getIsSupported = (baseAssets, privateAssets) => {
  return (asset) => {
    return (
      asset &&
      arrayIncludes(baseAssets, asset.baseAssetName) &&
      !arrayIncludes(privateAssets, asset.name)
    )
  }
}

// Creating specific functions using the factory
export const getIsInWeb3Wallet = getIsSupported(WEB3_WALLET_BASE_ASSETS, WEB3_WALLET_PRIVATE_ASSETS)
export const getIsInMobileWallet = getIsSupported(MOBILE_WALLET_BASE_ASSETS, MOBILE_PRIVATE_ASSETS)
export const getIsInDesktopWallet = getIsSupported(
  DESKTOP_WALLET_BASE_ASSETS,
  DESKTOP_WALLET_PRIVATE_ASSETS
)

export const getIsUnavailable = (assetsData, asset, icon) => {
  return (
    !icon ||
    (!getIsInDesktopWallet(asset) && !getIsInMobileWallet(asset) && !getIsInWeb3Wallet(asset))
  )
}
