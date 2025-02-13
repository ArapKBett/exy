export const getName = (asset) => {
  return asset?.displayName || asset?.name
}

export const getTicker = (asset) => {
  return asset?.displayTicker || asset?.ticker
}

export const getProperTicker = (asset) => {
  return asset.ticker
}
