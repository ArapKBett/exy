// Specific lists.
export const HIDDEN_APY_ASSETS = ['LUNA', 'DAI', 'CDAI', 'NEO', 'ETH']
export const POPULAR_ASSETS = ['BTC', 'XRP', 'ETH', 'ADA', 'DOGE']
export const SUNSET_ASSETS = [
  'bgold',
  'nem',
  'nano',
  'terra',
  'bluna_terra',
  'terrausd_terra',
  'anchorprotocol_terra',
  'vertcoin',
]

// Restaking.
const DEFAULT_AUTO_RESTAKING_FREQUENCY = '52'

export const basicToCompoundApyRate = (
  basicApyRate,
  compoundFrequency = DEFAULT_AUTO_RESTAKING_FREQUENCY
) => {
  const unitRate = basicApyRate / (100 * compoundFrequency)

  return 100 * (Math.pow(1 + unitRate, compoundFrequency) - 1)
}

// Unavailable assets.
export const UNAVAILABLE_COMBINED_ASSETS = ['sportx']
