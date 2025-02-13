import React from 'react'

import useDimensions from 'js/utils/hooks/useDimensions'

import 'components/pages/home/scss/header-asset-chromes.scss'

const assetChromes = ['BTC', 'ADA', 'USDC', 'SOL', 'ETH']

function AssetChromes() {
  const { isMobile } = useDimensions()

  return assetChromes.map((asset, index) => {
    if (isMobile && index === 1) {
      return null
    }

    return <div key={asset} className={`exodus__header-asset-chrome--${asset.toLowerCase()}`} />
  })
}

export default AssetChromes
