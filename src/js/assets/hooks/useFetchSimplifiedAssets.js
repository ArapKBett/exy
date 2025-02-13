import { useMemo } from 'react'

import prepareSimplifiedAssetList from 'js/assets/prepareSimplifiedAssetList'
import { useAssets } from 'js/utils/hooks/useAssetsBase'
import { useIcons } from 'js/utils/hooks/useIcons'
import { useNewAssets } from 'js/utils/hooks/useNewAssets'

const useFetchSimplifiedAssets = (tickers = []) => {
  const assetsData = useAssets()
  const iconsData = useIcons()
  const newAssetsData = useNewAssets()
  const dataObjects = {
    assetsData,
    iconsData,
    newAssetsData,
  }

  // Build assets array and filter by tickers if provided.
  const filteredAssets = useMemo(() => {
    const { assets, count } = prepareSimplifiedAssetList(dataObjects)
    if (!tickers.length) return { assets, count }

    const selectedAssets = assets
      .filter(({ properTicker }) => tickers.includes(properTicker))
      .sort((a, b) => tickers.indexOf(a.properTicker) - tickers.indexOf(b.properTicker))
    return { assets: selectedAssets, count: selectedAssets.length }
  }, [dataObjects, tickers])

  return filteredAssets
}

export default useFetchSimplifiedAssets
