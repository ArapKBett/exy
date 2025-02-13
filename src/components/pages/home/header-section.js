import classNames from 'classnames'
import React, { useState } from 'react'

import FeatureBanner from 'components/banner/FeatureBanner'
import { DownloadBanner, DownloadButton } from 'components/button/download-v2'
import BannersSection from 'components/pages/home/banners-section'
import PreviewFrame from 'components/pages/home/preview-frame'
import useDetectIosAppInstalled from 'js/utils/hooks/use-detect-ios-app-installed'
import useDetectUserAgent from 'js/utils/hooks/use-detect-user-agent'
import useSplitTest from 'js/analytics/use-split-test'
import useDimensions from 'js/utils/hooks/useDimensions'
import useScrollToAnchor from 'js/utils/hooks/use-scroll-to-anchor'
import {
  HEADER_PROMO_BANNER_ENABLED,
  HOMEPAGE_CRYPTO_VOICE_BANNER_ENABLED,
  HOMEPAGE_NYSE_BANNER_ENABLED,
  HOMEPAGE_RAMP_BANNER_ENABLED,
  isUk,
} from 'src/constants'

import 'components/pages/home/scss/header-section.scss'

import { TEST_250201 } from 'split-tests'

function HeaderSection({ data, images, location, pathname, isUS, loading, preventMobileVideo }) {
  const { loading: userAgentLoading, isMobile: isMobilePlatform } = useDetectUserAgent()
  const { isMobile: isMobileDimensions } = useDimensions()
  const maybeShowingIosSafariSmartAppBanner = useDetectIosAppInstalled()

  const { randomSplit, logSplitEvent } = useSplitTest(TEST_250201)

  const [anchorClicked, setAnchorClicked] = useState('')
  const handleAnchorClick = (key, event) => {
    event.preventDefault()
    window.history.pushState(null, '', event.currentTarget.href)
    setAnchorClicked((previousKey) => (previousKey === key ? '' : key))
    setTimeout(() => setAnchorClicked(''), 200)
  }
  useScrollToAnchor(!!anchorClicked, anchorClicked, 80)

  const { h1, h2, rampBanner, cryptoVoiceBanner, nyseBanner, banner, tags } = data
  const isLoading = loading || userAgentLoading
  const isMobile = isMobilePlatform && isMobileDimensions

  const banners = {
    cryptoVoice: isUS && HOMEPAGE_CRYPTO_VOICE_BANNER_ENABLED && cryptoVoiceBanner,
    nyse: HOMEPAGE_NYSE_BANNER_ENABLED && nyseBanner,
    ramp: HOMEPAGE_RAMP_BANNER_ENABLED && rampBanner,
  }
  const shouldShowBannerSection = banners.cryptoVoice || banners.nyse

  let videoMp4
  let videoWebm

  if (isMobile && !preventMobileVideo) {
    videoMp4 = require(`static/home/${pathname}/img/header-mobile-preview.mp4`).default
    videoWebm = require(`static/home/${pathname}/img/header-mobile-preview.webm`).default
  }
  const videos = { mp4: videoMp4, webm: videoWebm }

  const googleDownloadProps = {
    utmSource: 'exodus-website',
    utmCampaign: 'home-page',
    utmContent: 'home-page',
  }

  const downloadProps = {
    location,
    pathname,
    trackerPage: 'HomePage',
    androidLinkProps: googleDownloadProps,
    extensionLinkProps: googleDownloadProps,
  }

  return (
    <>
      <header
        className={classNames('x__index-page__header', {
          'x__index-page__header--with-risk-banner': isUk,
          'x__index-page__header--with-promo-banner': HEADER_PROMO_BANNER_ENABLED,
        })}
      >
        <div className="x__index-page__header__content">
          {h1 ? (
            <h1
              className="x__index-page__header__heading"
              dangerouslySetInnerHTML={{ __html: h1 }}
            />
          ) : null}
          {h2 ? (
            <h2
              className="x__index-page__header__subheading"
              dangerouslySetInnerHTML={{ __html: h2 }}
            />
          ) : null}
          {tags && tags.length > 0 ? (
            <ul className="x__index-page__header__tags">
              {tags.map(({ key, label, onlyMobile }) => (
                <li
                  key={key}
                  className={classNames(`x__index-page__header__tags--${key}`, {
                    'x__index-page__header__tags--sm': onlyMobile,
                  })}
                >
                  <a
                    href={`#${key}`}
                    role="button"
                    onClick={(event) => handleAnchorClick(key, event)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          {!isMobile ? (
            <div
              className={classNames('x__index-page__header__actions', {
                show: !isMobile,
              })}
            >
              <DownloadButton
                {...downloadProps}
                style={
                  randomSplit
                    ? { backgroundImage: 'none', backgroundColor: '#FFFFFF', color: '#000000' }
                    : {}
                }
                onClick={logSplitEvent}
              />
            </div>
          ) : null}
        </div>
        {!isLoading ? (
          <>
            {!banners.cryptoVoice ? <PreviewFrame images={images} videos={videos} /> : null}
            {shouldShowBannerSection ? <BannersSection banners={banners} /> : null}
            {!!banner && !banners.cryptoVoice && !banners.nyse ? (
              <FeatureBanner
                assets={banner.assets}
                button={banner.button}
                description={banner.description}
                previewImagePathname={pathname}
                title={banner.title}
              />
            ) : null}
          </>
        ) : null}
      </header>
      {isMobile && !maybeShowingIosSafariSmartAppBanner ? (
        <DownloadBanner {...downloadProps} />
      ) : null}
    </>
  )
}

export default HeaderSection
