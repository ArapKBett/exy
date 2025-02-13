import { getCombinedChildren } from 'src/js/assets/utils/getCombined'

const hasDisplayNetwork = (assetsData, asset) => {
  const unavailableAssets = []
  const combined = getCombinedChildren(unavailableAssets)
  return (
    (asset?.baseAssetName !== asset?.properName?.toLowerCase() &&
      asset?.displayNetworkTicker !== asset?.properTicker) ||
    combined.includes(asset.name)
  )
}

const getNetwork = (dataObjects, asset) => {
  if (!hasDisplayNetwork(dataObjects.assetsData, asset)) return {}
  const icons = dataObjects.iconsData['svg-transparent']
  const networkIcons = dataObjects.iconsData['svg-network']
  const networkTicker = asset.displayNetworkTicker || undefined
  const networkNameStr = asset.baseAssetName?.toLowerCase()
  const networkTickerStr = networkTicker?.toLowerCase()
  const nameTicker = networkNameStr || networkTickerStr
  const chainBadgeColors = dataObjects.assetsData[nameTicker]?.chainBadgeColors || ['#CCC', '#DDD']
  const chainBadgeCopyColor = networkTicker === 'ETH' || networkTicker === 'ALGO' ? '#000' : '#FFF'

  return {
    network: networkTicker,
    networkIcon: networkIcons[nameTicker] || icons[nameTicker],
    networkColors: { gradient: chainBadgeColors, text: chainBadgeCopyColor },
  }
}

export default getNetwork
