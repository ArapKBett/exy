export const getIsNew = (newAssetsData, asset) => {
  return Boolean(newAssetsData?.includes(asset?.name))
}

const getNew = (assets) => {
  const newAssets = assets.filter((asset) => !!asset.new)

  const filtered = newAssets.reduce((acc, current) => {
    const x = acc.find((asset) => asset.ticker === current.ticker)

    if (!x) return acc.concat([current])
    else return acc
  }, [])

  return filtered
}

export default getNew
