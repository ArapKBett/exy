import { graphql, useStaticQuery } from 'gatsby'
import { getImage, withArtDirection } from 'gatsby-plugin-image'
import React, { useEffect, useRef, useState } from 'react'

import { Header, Footer } from 'components/layout'
import { HeaderSection, ShowcaseSection, TestimonialsSection } from 'components/pages/home'
import AssetsSection from 'components/pages/shared/assets-section'
import Background from 'components/pages/shared/background'
import Schema from 'components/schema-markup/Schema'
import fetchCountryData from 'js/utils/fetch-country-data'
import useRellax from 'js/utils/hooks/useRellax'
import { isUk, LEDGER_WALLET_ENABLED } from 'src/constants'
import bgParticlesMp4 from 'static/home/img/header-bg-particles.mp4'
import bgParticlesWebm from 'static/home/img/header-bg-particles.webm'

import 'static/home/scss/styles.scss'

const HomePage = ({
  images = {},
  location,
  pageName = 'home',
  pageData = {},
  pathname = 'en',
  enableSubscribeNotice = true,
  RiskDisclaimerSection,
}) => {
  // get page data.
  const { schemaMarkup, content, footer } = pageData
  const { disclaimer, hardware, header, stake, swap, testimonials, tokens, web3 } = content

  const showDisclaimer = !!disclaimer && !!RiskDisclaimerSection

  const [isUS, setIsUS] = useState(false)
  const [loading, setLoading] = useState(true)

  const backgroundRef = useRef(null)

  useRellax({ ref: backgroundRef, center: false })

  useEffect(() => {
    const fetchIsUsData = async () => {
      try {
        const countryIsUS = await fetchCountryData()
        setIsUS(countryIsUS)
      } catch (error) {
        console.error('Error fetching country data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchIsUsData()
  }, [])

  const background = useStaticQuery(graphql`
    query {
      bgMobile: file(relativePath: { regex: "/^home\/img\/header-bg-m\\.jpg$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, width: 760, placeholder: BLURRED)
        }
      }
      bgDesktop: file(relativePath: { regex: "/^home\/img\/header-bg-d\\.jpg$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, width: 3200, placeholder: BLURRED)
        }
      }
      bgParticles: file(relativePath: { regex: "/^home\/img\/header-bg-particles\\.png$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, width: 2400, placeholder: BLURRED)
        }
      }
      bgWeb3: file(relativePath: { regex: "/^home\/img\/assets-section-glow\\.png$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, width: 1600, placeholder: BLURRED)
        }
      }
    }
  `)

  const backgroundImages = {
    bgImage: withArtDirection(getImage(background.bgDesktop), [
      { media: '(max-width: 768px)', image: getImage(background.bgMobile) },
    ]),
    bgParticles: {
      poster: getImage(background.bgParticles),
      mp4: bgParticlesMp4,
      webm: bgParticlesWebm,
    },
  }

  const sectionImages = {
    preview: {
      desktop: images?.previewDesktop,
      mobile: images?.previewMobile,
    },
    swap: withArtDirection(getImage(images?.swapDesktop), [
      { media: '(max-width: 768px)', image: getImage(images?.swapMobile) },
    ]),
    stake: withArtDirection(getImage(images?.stakeDesktop), [
      { media: '(max-width: 768px)', image: getImage(images?.stakeMobile) },
    ]),
    tokens: withArtDirection(getImage(images?.tokensDesktop), [
      { media: '(max-width: 768px)', image: getImage(images?.tokensMobile) },
    ]),
    web3: getImage(background.bgWeb3),
    hardware: withArtDirection(
      getImage(LEDGER_WALLET_ENABLED ? images?.hardwareDesktopLedger : images?.hardwareDesktop),
      [
        {
          media: '(max-width: 768px)',
          image: getImage(
            LEDGER_WALLET_ENABLED ? images?.hardwareMobileLedger : images?.hardwareMobile
          ),
        },
      ]
    ),
  }

  // return content.
  return (
    <div className="x__index-page">
      <Header
        trackerPage={pageName}
        location={location}
        pathname={pathname}
        showHeaderPromoBanner
      />
      <main className="x">
        <Background
          ref={backgroundRef}
          images={backgroundImages}
          withBanner={isUk}
          data-rellax-speed={-2}
        />
        {showDisclaimer && <RiskDisclaimerSection data={disclaimer} />}
        {header && (
          <HeaderSection
            data={header}
            images={sectionImages.preview}
            location={location}
            pathname={pathname}
            isUS={isUS}
            loading={loading}
            preventMobileVideo={showDisclaimer}
          />
        )}
        {!loading && (
          <>
            {swap && (
              <ShowcaseSection
                id="swap"
                data={{ ...swap, image: sectionImages.swap }}
                variant={1}
              />
            )}
            {stake && (
              <ShowcaseSection
                id="stake"
                data={{ ...stake, image: sectionImages.stake }}
                variant={2}
              />
            )}
            {tokens && (
              <ShowcaseSection
                id="assets"
                data={{ ...tokens, image: sectionImages.tokens }}
                variant={3}
              />
            )}
            {web3 && (
              <AssetsSection id="web3" data={{ ...web3, backgroundImage: sectionImages.web3 }} />
            )}
            {hardware && (
              <ShowcaseSection
                data={{ ...hardware, image: sectionImages.hardware }}
                variant={0}
                withSmallImage={!LEDGER_WALLET_ENABLED}
              />
            )}
            {testimonials && <TestimonialsSection data={testimonials} />}
          </>
        )}
      </main>
      {!loading && (
        <Footer
          pathname={pathname}
          legalCopy={footer?.legalCopy}
          enableSubscribeNotice={enableSubscribeNotice}
          intercom={false}
          withDownloadBanner
        />
      )}
      <Schema {...schemaMarkup} />
    </div>
  )
}

export default HomePage
