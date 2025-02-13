import classNames from 'classnames'
import { Link } from 'gatsby'
import React, { useMemo } from 'react'

import DownloadDropdown from 'components/DownloadDropdown'
import { trackTwitterEvent } from 'components/head/pixels/twitter'
import AppStats from 'data/AppStats.json'
import logEvent from 'js/analytics'
import { DOWNLOAD_EXTENSION, DOWNLOAD_IOS, DOWNLOAD_ANDROID } from 'js/analytics/trackers'
import processCampaigns from 'js/campaigns'
import buildAppStoreLink from 'js/utils/buildAppStoreLink'
import buildExtensionWebstoreLink from 'js/utils/buildExtensionWebstoreLink'
import buildPlayStoreLink from 'js/utils/buildPlayStoreLink'
import useDetectUserAgent from 'js/utils/hooks/use-detect-user-agent'
import useDimensions from 'js/utils/hooks/useDimensions'
import useIsMounted from 'js/utils/hooks/useIsMounted'
import { DOWNLOADS_URL, isUk } from 'src/constants'

// Styles & Images
// import 'src/components/pages/download/scss/HeaderSection.scss' TODO: move specific section SCSS

// Partials:
const DesktopModule = ({ data, pathname, style, onClick }) => (
  <div className="x-download-platforms__item x-download-desktop" style={style}>
    <div className="x-download-platforms__item-content">
      <h1>{data.h1}</h1>
      <span className="x-download-platforms__subheading">{data.copy}</span>

      <div className="x-download__button-group">
        <DownloadDropdown
          className="x-header__desktop-group-btn1"
          variant="download"
          pathname={pathname}
          onClick={onClick}
        />
      </div>
    </div>

    <div className="x-download-platforms__links">
      {!isUk && data.link1?.path && (
        <>
          <Link to={data.link1.path}>{data.link1.copy}</Link>
          <span />
        </>
      )}
      {data.hashesUrl && (
        <a href={data.hashesUrl} target="_blank">
          {data.link2.copy}
        </a>
      )}
    </div>

    <div className="x-download-platforms__chrome">
      <img src={`/download/${pathname}/img/desktop.png`} />

      <span className="x-download-platforms__chrome1" />
      <span className="x-download-platforms__chrome2 x-download-desktop__chrome" />
    </div>
  </div>
)

const MobileModule = ({ data, pathname, style, onIosClick, onAndroidClick }) => (
  <div className="x-download-platforms__item x-download-mobile" style={style}>
    <div className="x-download-platforms__item-content">
      <h1>{data.h1}</h1>
      <span className="x-download-platforms__subheading">{data.copy}</span>

      <div className="x-button-store__grouped x-button-store__grouped--large-screen">
        {data.link1 && (
          <div className="x-button-store__grouped-item">
            <a
              href={data.appStoreLink}
              className="x__button x-button-store ga-click-event"
              onClick={onIosClick}
            >
              <span className="x__button-align">
                <span className="x__button-align-text">
                  <span className="x-button-store__ic-container">
                    <svg version="1.1" viewBox="0 0 18 22" xmlns="http://www.w3.org/2000/svg">
                      <title>{data.link1.alt}</title>
                      <path
                        d="m14.797 11.58c0.0020632 1.9194 1.1515 3.6515 2.9192 4.3992-0.33998 1.1044-0.85244 2.1481-1.5184 3.0925-0.89438 1.3379-1.8321 2.645-3.3205 2.6691-1.4462 0.03338-1.9322-0.8511-3.591-0.8511-1.6743 0-2.1923 0.82695-3.5794 0.88448-1.4174 0.0525-2.5007-1.428-3.4276-2.7533-1.8526-2.7066-3.2952-7.6277-1.3612-10.976 0.90818-1.632 2.6062-2.6676 4.4729-2.7279 1.4187-0.02919 2.7362 0.95814 3.6085 0.95814 0.85571 0 2.4837-1.1811 4.1629-1.0048 1.5961 0.049938 3.0752 0.84957 3.9912 2.1577-1.4453 0.88857-2.3347 2.4556-2.3566 4.1521zm-2.7316-8.0898c-0.78733 0.97926-1.9803 1.5433-3.2368 1.5304-0.079905-1.2278 0.33154-2.4371 1.1437-3.3614 0.82249-0.93683 1.9677-1.5294 3.2076-1.6596 0.096815 1.2642-0.30299 2.5164-1.1145 3.4906z"
                        fill="#fff"
                        fillRule="nonzero"
                      />
                    </svg>
                  </span>

                  <span
                    className="x-button-store__group"
                    dangerouslySetInnerHTML={{ __html: data.link1.copy }}
                  />
                  <span className="x-button-store__star">{data.stats.ios}</span>
                </span>
              </span>
            </a>
          </div>
        )}

        {data.link2 && (
          <div className="x-button-store__grouped-item">
            <a
              href={data.playStoreLink}
              className="x__button x-button-store ga-click-event"
              onClick={onAndroidClick}
            >
              <span className="x__button-align">
                <span className="x__button-align-text">
                  <span className="x-button-store__ic-container">
                    <svg version="1.1" viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg">
                      <title>{data.link2.alt}</title>
                      <g fill="none" fillRule="evenodd">
                        <g fill="#fff" fillRule="nonzero">
                          <path
                            d="m0.67287 0.40765c-0.31876 0.39406-0.47603 0.89444-0.44 1.4v22.12c-0.034026 0.51038 0.13489 1.0135 0.47 1.4l0.07 0.08 12.36-12.39v-0.3l-12.39-12.38-0.07 0.07z"
                            opacity=".5"
                          />
                          <path
                            d="m17.233 17.148l-4.1-4.13v-0.3l4.1-4.13 0.09 0.06 4.91 2.78c1.4 0.79 1.4 2.09 0 2.89l-4.89 2.78-0.11 0.05z"
                            opacity=".9"
                          />
                          <path
                            d="m17.353 17.098l-4.22-4.23-12.46 12.46c0.58303 0.51897 1.4532 0.5484 2.07 0.07l14.61-8.3"
                            opacity=".3"
                          />
                          <path
                            d="m17.353 8.6476l-14.61-8.3c-0.61304-0.48528-1.4861-0.45997-2.07 0.06l12.46 12.46 4.22-4.22z"
                            opacity=".7"
                          />
                        </g>
                      </g>
                    </svg>
                  </span>

                  <span
                    className="x-button-store__group"
                    dangerouslySetInnerHTML={{ __html: data.link2.copy }}
                  />
                  <span className="x-button-store__star">{data.stats.android}</span>
                </span>
              </span>
            </a>
          </div>
        )}
      </div>
    </div>

    <div className="x-download-platforms__chrome">
      <img src={`/download/${pathname}/img/mobile.png`} />

      <span className="x-download-platforms__chrome1" />
      <span className="x-download-platforms__chrome2 x-download-mobile__chrome" />
    </div>
  </div>
)

const Web3Module = ({ data, pathname, style, onClick }) => (
  <div className="x-download-platforms__item x-download-web3" style={style}>
    <div className="x-download-platforms__item-content">
      <h1>{data.h1}</h1>
      <span className="x-download-platforms__subheading">{data.copy}</span>

      {data.link1 && (
        <a
          href={data.extensionWebstoreLink}
          className="x__button x-header__browser extension"
          target="_blank"
          onClick={onClick}
        >
          <span className="x__button-align">
            <span className="x__button-align-text">{data.link1.copy}</span>
          </span>
        </a>
      )}
    </div>

    <div className="x-download-platforms__chrome">
      <img src={`/download/${pathname}/img/web3.png`} />

      <span className="x-download-platforms__chrome1" />
      <span className="x-download-platforms__chrome2 x-download-web3__chrome" />
    </div>
  </div>
)

// Main component:
const HeaderSection = ({ data, version, pathname = 'en', location, twitterEvents }) => {
  // get page data.
  const { desktop, mobile, web3 } = data
  const { ios, android } = AppStats
  const pathForTrackers = pathname !== 'en' ? pathname : ''

  // handle download action.
  const handleButtonClick = ({
    campaignEventType,
    analyticsArgs,
    analyticsPage,
    pathForTrackers,
    twitterEventKey,
  }) => {
    if (campaignEventType) processCampaigns({ eventType: campaignEventType })
    if (analyticsArgs) logEvent(analyticsArgs, analyticsPage)
    if (pathForTrackers) logEvent(pathForTrackers, analyticsPage)

    if (twitterEvents) {
      const { twe } = twitterEvents.total
      if (twe) trackTwitterEvent(twe)
    }
    if (twitterEventKey) {
      const { twe, ga } = twitterEventKey
      if (twe) trackTwitterEvent(twe)
      if (ga) logEvent({ ga }, analyticsPage)
    }

    rdt('track', 'AddToCart') // eslint-disable-line no-undef
  }

  const { loading, isDesktop, isExtension, isMobile } = useDetectUserAgent()
  const { breakpoint } = useDimensions(1300)

  const order = useMemo(() => {
    if (!loading && breakpoint) {
      if (isDesktop) {
        return { desktop: 1, mobile: 3, extension: 2 }
      } else if (isMobile) {
        return { desktop: 3, mobile: 1, extension: 2 }
      } else if (isExtension) {
        return { desktop: 2, mobile: 3, extension: 1 }
      }
    }
    return { desktop: 1, mobile: 2, extension: 3 }
  }, [loading, breakpoint, isDesktop, isMobile, isExtension])

  const isMounted = useIsMounted()
  // only provide location (used for query params) after client render.
  const extensionWebstoreLink = () => {
    let utmContent = 'download-page'
    if (twitterEvents?.browser?.utmContent) {
      utmContent = twitterEvents.browser.utmContent
    }
    return buildExtensionWebstoreLink({
      location: isMounted && location,
      referrer: isMounted && document?.referrer,
      utmContent,
    })
  }

  const appStoreLink = () => {
    let ct = 'download'
    if (twitterEvents?.ios?.ct) {
      ct = twitterEvents.ios.ct
    }
    return buildAppStoreLink({
      location: isMounted && location,
      referrer: isMounted && document?.referrer,
      ct,
    })
  }

  const playStoreLink = () => {
    let utmSource = 'exodus-website'
    let utmCampaign = 'download-page'
    let utmContent = 'download-page'
    if (twitterEvents?.android) {
      utmSource = twitterEvents.android.utmSource
      utmCampaign = twitterEvents.android.utmCampaign
      utmContent = twitterEvents.android.utmContent
    }
    return buildPlayStoreLink({
      location: isMounted && location,
      referrer: isMounted && document?.referrer,
      utmSource,
      utmCampaign,
      utmContent,
    })
  }

  const builsHashesUrl = version?.latest && `${DOWNLOADS_URL}/hashes-exodus-${version.latest}.txt`

  // return content.
  return (
    <div
      className={classNames('x-download-platforms', {
        'x-download-platforms--with-banner': isUk,
      })}
    >
      <DesktopModule
        data={{ ...desktop, hashesUrl: builsHashesUrl }}
        pathname={pathname}
        onClick={() =>
          handleButtonClick({
            campaignEventType: 'download',
            twitterEventKey: twitterEvents?.desktop,
          })
        }
        style={{ order: order.desktop }}
      />

      <MobileModule
        data={{
          ...mobile,
          appStoreLink: appStoreLink(),
          playStoreLink: playStoreLink(),
          stats: { ios: ios.starRating, android: android.starRating },
        }}
        pathname={pathname}
        onIosClick={() =>
          handleButtonClick({
            campaignEventType: 'app-store',
            analyticsPage: 'DownloadPage',
            analyticsArgs: DOWNLOAD_IOS(),
            pathForTrackers: pathForTrackers && DOWNLOAD_IOS(pathForTrackers),
            twitterEventKey: twitterEvents?.ios,
          })
        }
        onAndroidClick={() =>
          handleButtonClick({
            campaignEventType: 'app-store',
            analyticsPage: 'DownloadPage',
            analyticsArgs: DOWNLOAD_ANDROID(),
            pathForTrackers: pathForTrackers && DOWNLOAD_ANDROID(pathForTrackers),
            twitterEventKey: twitterEvents?.android,
          })
        }
        style={{ order: order.mobile }}
      />

      <Web3Module
        data={{ ...web3, extensionWebstoreLink: extensionWebstoreLink() }}
        pathname={pathname}
        onClick={() =>
          handleButtonClick({
            analyticsArgs: DOWNLOAD_EXTENSION(),
            pathForTrackers: pathForTrackers && DOWNLOAD_EXTENSION(pathForTrackers),
            twitterEventKey: twitterEvents?.browser,
          })
        }
        style={{ order: order.extension }}
      />

      <div className="x-download-platforms__light x-download-platforms__light--v1" />
      <div className="x-download-platforms__light x-download-platforms__light--v2" />
      <div className="x-download-platforms__light x-download-platforms__light--v3" />
      <div className="x-download-platforms__light x-download-platforms__light--v4" />
    </div>
  )
}

export default HeaderSection
