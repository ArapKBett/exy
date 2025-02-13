import classNames from 'classnames'
import React, { useMemo } from 'react'

import BuyCryptoBanner from 'components/banner/buy-crypto'
import CryptoVoiceBanner from 'components/banner/crypto-voice'
import NyseBanner from 'components/banner/nyse'
import AssetChromes from './header-asset-chromes'

import './scss/banner-secrtion.scss'

function BannersSection({ banners = {}, withChrome = false }) {
  const bannerComponents = {
    ramp: BuyCryptoBanner,
    cryptoVoice: CryptoVoiceBanner,
    nyse: NyseBanner,
  }

  const Banners = useMemo(() => {
    const activeBanners = Object.entries(bannerComponents)
      .filter(([key]) => banners[key])
      .map(([key]) => [key, banners[key]])

    if (activeBanners.length === 0) return null

    return (
      <div
        className={classNames('x__index-page__banner-section', {
          'x__index-page__banner-section--with-chromes': withChrome,
        })}
      >
        {activeBanners.map(([key, banner]) => {
          const BannerComponent = bannerComponents[key]
          return (
            <BannerComponent
              key={key}
              button={banner.button}
              description={banner.description}
              fullWidth={activeBanners.length === 1}
              title={banner.title}
            />
          )
        })}
        {withChrome ? <AssetChromes /> : null}
      </div>
    )
  }, [banners, withChrome])

  return Banners
}

export default BannersSection
