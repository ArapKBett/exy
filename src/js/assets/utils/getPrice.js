export const getPrice = (ticker, hasPrice, hasCurrentPrice) => {
  const price = (!!hasPrice && hasPrice[ticker]) || null
  const currentPrice = (!!hasCurrentPrice && hasCurrentPrice[ticker]) || null

  const priceObj = {
    ...price?.USD,
    current: currentPrice?.USD,
  }

  return priceObj
}

// TODO: remove 'marketcap' and use `.mc` instead
export const getMarketcap = (ticker, hasPrice) => {
  const marketcap = !!hasPrice && hasPrice[ticker]?.USD?.mc

  return marketcap
}

export const getAPY = (ticker, hasApy) => {
  const apy = (!!hasApy && hasApy[ticker]) || null

  return apy
}
