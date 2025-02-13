import CombinedAssets from 'src/data/CombinedAssets.json'

import { UNAVAILABLE_COMBINED_ASSETS } from 'src/js/assets/constants'

const filterUnavailable = (unavailableAssets, arr) => {
  return arr
    .map((assetName) => {
      if (
        unavailableAssets.includes(assetName) ||
        UNAVAILABLE_COMBINED_ASSETS.includes(assetName)
      ) {
        return null
      }

      return assetName
    })
    .filter((el) => el !== null)
}

export const getCombinedChildren = (unavailableAssets) => {
  const assetsCombinedArray = Object.keys(CombinedAssets)
    .map((key) => {
      const combinedAsset = CombinedAssets[key]

      if (combinedAsset.assetType !== 'MULTI_NETWORK_ASSET') return null

      return filterUnavailable(unavailableAssets, combinedAsset.combinedAssetNames)
    })
    .flat(1)
    .filter((el) => el !== null)
  return assetsCombinedArray
}

export const getCombinedParents = (assetsData, unavailableAssets) => {
  const combined = Object.keys(CombinedAssets)
    .map((key) => {
      const { assetType, combinedAssetNames } = CombinedAssets[key]
      const assets = filterUnavailable(unavailableAssets, combinedAssetNames)

      if (assetType !== 'MULTI_NETWORK_ASSET' || assets.length <= 1) return null

      const fallbackAsset = assetsData[combinedAssetNames[0]] || assetsData[combinedAssetNames[1]]

      return fallbackAsset?.name || null
    })
    .filter((el) => el !== null)

  return combined
}

export const getCombinedAssets = (assetsData, unavailableAssets, asset) => {
  const buildCombinedAssets = getCombinedChildren(unavailableAssets)
    .map((key) => {
      const combinedAsset = assetsData[key]
      if (combinedAsset?.displayName === asset?.displayName) {
        return combinedAsset
      }
      return null
    })
    .flat(1)
    .filter((el) => el !== null)

  return buildCombinedAssets
}

const getCombined = (assetsData, assets) => {
  const unavailableAssets = []
  const combinedChildren = getCombinedChildren(unavailableAssets)
  const combinedParents = getCombinedParents(assetsData, unavailableAssets)

  const filterCombinedAssets = assets
    .map((key) => {
      if (combinedChildren.includes(key)) return null
      return key
    })
    .filter((el) => el !== null)

  return [...combinedParents, ...filterCombinedAssets]
}

export default getCombined
