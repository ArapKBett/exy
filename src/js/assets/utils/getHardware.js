import applications from '@exodus/hw-ledger/lib/module/assets/applications'
import { createMeta } from '@exodus/trezor-meta'

const difference = (arr1, arr2) => {
  const set2 = new Set(arr2)
  return arr1.filter((x) => !set2.has(x))
}

const getTrezor = (assetsData, key) => {
  const { SUPPORTED_ASSETS, SUPPORTED_ONLY_BY_MODEL_T, ASSETS_BY_MODEL } = createMeta(assetsData)
  // Assets supported exclusively on Safe 3.
  const SUPPORTED_ONLY_BY_SAFE_3 = difference(ASSETS_BY_MODEL['Safe 3'], ASSETS_BY_MODEL['1'])
  // Assets supported exclusively on Safe 5.
  const SUPPORTED_ONLY_BY_SAFE_5 = difference(ASSETS_BY_MODEL['Safe 5'], ASSETS_BY_MODEL['1'])

  const trezorBase = SUPPORTED_ASSETS.some((assetName) => assetName === key)
  const trezorModelT = SUPPORTED_ONLY_BY_MODEL_T.some((assetName) => assetName === key)
  const trezorSafe3 = SUPPORTED_ONLY_BY_SAFE_3.some((assetName) => assetName === key)
  const trezorSafe5 = SUPPORTED_ONLY_BY_SAFE_5.some((assetName) => assetName === key)

  const trezorModels = [
    trezorModelT && 'Model T',
    trezorSafe3 && 'Safe 3',
    trezorSafe5 && 'Safe 5',
  ].filter(Boolean)

  const isAssetSupported = trezorBase || trezorModels.length > 0
  const supportedByString = `Supported${
    trezorModels.length > 0 ? ` on ${trezorModels.join(', ')}` : ''
  }`

  return isAssetSupported ? supportedByString : null
}

const getLedger = (key, showVersions = false) => {
  const SUPPORTED_ASSETS = Object.values(applications).map(
    ({ primaryAssetName, supportedVersions }) => {
      return { assetName: primaryAssetName, version: supportedVersions }
    }
  )
  const ledgerBase = SUPPORTED_ASSETS.some(({ assetName }) => assetName === key)
  // Add version support.
  const ledgerVersionByAsset = SUPPORTED_ASSETS.find(({ assetName }) => assetName === key)?.version
  const supportedByString = `Supported${
    showVersions ? ` on ${ledgerVersionByAsset?.replace(/[^0-9.]/g, '')}` : ''
  }`

  return ledgerBase ? supportedByString : null
}

export { getLedger, getTrezor }
