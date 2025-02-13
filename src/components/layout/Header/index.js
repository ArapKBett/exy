import classNames from 'classnames'
import React, { useState, useEffect } from 'react'

import usePixels from 'components/head/pixels'
import buildDownloadItems from 'components/button/download-v2/utils/build-download-items'
import buildDownloadLinks from 'components/button/download-v2/utils/build-download-links'
import getLinkItem from 'components/button/download-v2/utils/get-link-item'
import { downloadItem, homepageItem, navigationItems } from 'data/pages/Navigation'
import processCampaigns from 'js/campaigns'
import useDimensions from 'js/utils/hooks/useDimensions'
import useIsMounted from 'js/utils/hooks/useIsMounted'
import { useLatestVersion } from 'js/utils/hooks/useLatestVersion'
import useDetectUserAgent from 'js/utils/hooks/use-detect-user-agent'
import useScrollHasReachedTarget from 'js/utils/hooks/use-scroll-has-reached-target'
import { isUk, HEADER_PROMO_BANNER_ENABLED } from 'src/constants'
import DownloadButton from './parts/download-button'
import ExodusLogo from './parts/exodus-responsive-logo'
import HamburgerButton from './parts/hamburger-button'
import NavigationModule from './parts/navigation-module'
import PlugToCenterMenu from './parts/plug-to-center-menu'
import SocialNetworks from '../shared/social-networks'

import './styles.scss'

// Banners:
// This saves on css by only building the banners if they're enabled.
let HeaderInvestmentRiskBanner
if (isUk) {
  HeaderInvestmentRiskBanner = require('components/banner/header-investment-risk-banner').default
}

let HeaderPromoBanner
if (HEADER_PROMO_BANNER_ENABLED) {
  HeaderPromoBanner = require('components/banner/header-promo-banner').default
}

function getNavigationData(pathname) {
  return {
    download: downloadItem(pathname),
    homepage: homepageItem(pathname),
    navigation: navigationItems(pathname),
  }
}

function Header({
  location,
  trackerPage,
  pathname = 'en',
  background = 'primary',
  social = false,
  minimal = false,
  showInvestmentRiskBanner = true,
  showHeaderPromoBanner = false,
  onChange,
}) {
  const { download, homepage, navigation } = getNavigationData(pathname)

  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [hideBanner, setHideBanner] = useState(false)

  const isMounted = useIsMounted()
  const releaseVersion = useLatestVersion().latest
  const { isMobile } = useDimensions()
  const condenseHeader = useScrollHasReachedTarget({ preventCondition: menuIsOpen })
  const { loading, os: userAgentOs } = useDetectUserAgent()

  const trackerPageName = `header_${trackerPage}-page`
  const downloadLinks = buildDownloadLinks({
    variant: userAgentOs,
    location: isMounted && location,
    referrer: isMounted && document?.referrer,
    version: releaseVersion,
    androidLinkProps: {
      utmSource: 'exodus-website',
      utmCampaign: trackerPageName,
      utmContent: trackerPageName,
    },
  })
  const items = buildDownloadItems(downloadLinks, trackerPageName, pathname)
  const linkedItem = getLinkItem(items, userAgentOs)

  const handleBannerHide = () => setHideBanner(true)

  useEffect(() => {
    if (isMobile) return
    setMenuIsOpen(false)
  }, [condenseHeader])

  useEffect(() => {
    if (!onChange) return
    onChange(condenseHeader)
  }, [isMobile])

  useEffect(() => {
    processCampaigns({ eventType: 'pageview' })
  }, [])

  const showLogotypeOnly = condenseHeader && !minimal
  const showNavigationMenu = menuIsOpen || !minimal
  const showSocialNetworks = social && !isUk && !minimal
  const showDownloadButton = !social && !minimal && !loading
  const showHamburgerButton = isMobile && !minimal

  const showFeatureBanner = showHeaderPromoBanner && HEADER_PROMO_BANNER_ENABLED
  const showRiskBanner = isUk && showInvestmentRiskBanner && !minimal

  const filteredSocialNetworks = ['facebook', 'twitter', 'instagram', 'youTube']

  // Handle body element changes.
  useEffect(() => {
    if (typeof document === 'undefined') return

    const baseClassName = 'exodus__body'
    const backgroundClassName = `${baseClassName}--${background}`
    const menuOpenClassName = `${baseClassName}--menu-open`

    const body = document.querySelector('body')

    body.classList.add(baseClassName)
    body.classList.add(backgroundClassName)
    body.classList.toggle(menuOpenClassName, menuIsOpen || '')

    return () => {
      body.classList.remove(baseClassName)
      body.classList.remove(backgroundClassName)
      body.classList.remove(menuOpenClassName)
    }
  }, [background, menuIsOpen])

  // Initialize pixels.
  usePixels()

  const downloadLinkData = {
    ...download,
    ...(isMobile &&
      linkedItem && {
        href: linkedItem.link,
        onClick: linkedItem.tracker,
      }),
  }

  return (
    <>
      {showFeatureBanner && <HeaderPromoBanner />}
      <div
        className={classNames(`exodus__header exodus__header--${background}`, {
          'exodus__header--condensed': condenseHeader,
          'exodus__header--menu-open': isMobile && menuIsOpen,
          'exodus__header--minimal': minimal,
          'exodus__header--with-banner': showFeatureBanner && !hideBanner,
        })}
      >
        <nav>
          <ExodusLogo
            {...homepage}
            isMenuOpen={menuIsOpen}
            hideLogotype={showLogotypeOnly}
            showLogotype={minimal}
          />
          {showNavigationMenu && (
            <NavigationModule
              background={background}
              data={navigation}
              isMenuOpen={menuIsOpen}
              showSocialNetworks={showSocialNetworks && isMobile}
              onChange={setMenuIsOpen}
            />
          )}
          {showSocialNetworks && !isMobile && (
            <SocialNetworks filterItems={filteredSocialNetworks} navigation />
          )}
          {showDownloadButton && <DownloadButton data={downloadLinkData} isMenuOpen={menuIsOpen} />}
          {!showSocialNetworks && !showDownloadButton && <PlugToCenterMenu />}
          {showHamburgerButton && (
            <HamburgerButton
              isMenuOpen={menuIsOpen}
              onClick={() => setMenuIsOpen((previousState) => !previousState)}
            />
          )}
        </nav>
      </div>
      {showRiskBanner && (
        <HeaderInvestmentRiskBanner
          withPromoBanner={showFeatureBanner && !hideBanner}
          stretch={condenseHeader}
          onBannerHide={handleBannerHide}
        />
      )}
    </>
  )
}

export default Header
