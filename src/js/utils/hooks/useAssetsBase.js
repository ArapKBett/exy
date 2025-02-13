import { useMemo } from 'react'

import assetsData from 'data/AssetsBase.json'

export const useAssets = () => {
  return useMemo(() => {
    if (!assetsData) {
      console.warn('No assets data found')
      return {}
    }

    return assetsData
  }, [assetsData])
}
