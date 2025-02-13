const floorTo5 = (num) => Math.floor((num - 1) / 5) * 5

// Count.
const getCount = (assets) => {
  const obj = assets.reduce(
    (acc, asset) => {
      if (asset.exchange) acc.exchange++
      if (asset.apy) acc.apy++
      if (asset.trezor) acc.trezor++
      if (asset.desktopWallet) acc.desktop++
      if (asset.mobileWallet) acc.mobile++
      if (asset.web3Wallet) acc.web3++
      acc.all++

      return acc
    },
    { all: 0, exchange: 0, apy: 0, trezor: 0, desktop: 0, mobile: 0, web3: 0 }
  )

  return {
    ...obj,
    allFloorTo5: floorTo5(obj.all),
    exchangeFloorTo5: floorTo5(obj.exchange),
    apyFloorTo5: floorTo5(obj.apy),
    trezorFloorTo5: floorTo5(obj.trezor),
  }
}

export default getCount
