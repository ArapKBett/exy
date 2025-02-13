import {
  getColors,
  getCombined,
  getCount,
  getIcon,
  getIsNew,
  getIsUnavailable,
  getLink,
  getName,
  getNetwork,
  getTicker,
  getProperTicker,
} from 'js/assets/utils'

const processAssetData = (dataObjects, asset) => {
  const colors = getColors(asset)
  const icon = getIcon(dataObjects.iconsData, asset.name)
  const isNew = getIsNew(dataObjects.newAssetsData, asset)
  const link = getLink(asset.ticker)
  const name = getName(asset)
  const ticker = getTicker(asset)
  const properTicker = getProperTicker(asset)
  const unavailable = getIsUnavailable(dataObjects.assetsData, asset, icon)
  const { network, networkIcon } = getNetwork(dataObjects, asset)

  return {
    colors,
    icon,
    link,
    name,
    network,
    networkIcon,
    new: isNew,
    properTicker,
    ticker,
    unavailable,
  }
}

const prepareSimplifiedAssetList = (dataObjects) => {
  // create assets array from objects.
  const assetsArrObj = Object.keys(dataObjects.assetsData)
  const assetsArrComb = getCombined(dataObjects.assetsData, assetsArrObj)

  const assetsArray = assetsArrComb.map((key) => {
    const asset = dataObjects.assetsData[key]
    return processAssetData(dataObjects, asset)
  })

  // filter out unavailable assets and without icon, and return.
  const assets = assetsArray.filter((asset) => !asset.unavailable)
  // assets cont.
  const count = getCount(assets)

  return { assets, count }
}

export default prepareSimplifiedAssetList
