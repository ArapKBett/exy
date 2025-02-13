import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage, withArtDirection } from 'gatsby-plugin-image'
import React from 'react'

import Button from 'components/button'
import logEvent from 'js/analytics/logEvent'
import { MARCOM_CRYPTO_VOICE_BANNER } from 'js/analytics/trackers'
import AmericaCryptoSvg from './america-crypto-svg'

import './crypto-voice.scss'

function CryptoVoiceBanner({ title, description, button }) {
  const handleClick = () => {
    logEvent(MARCOM_CRYPTO_VOICE_BANNER)
  }

  const images = useStaticQuery(graphql`
    query {
      shieldSmall: file(relativePath: { regex: "/^home\/img\/crypto-voice-shield-ssize\\.png$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, placeholder: BLURRED, width: 585)
        }
      }
      shieldLarge: file(relativePath: { regex: "/^home\/img\/crypto-voice-shield-lsize\\.png$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, placeholder: BLURRED, width: 620)
        }
      }
      backgroundSmall: file(relativePath: { regex: "/^home\/img\/crypto-voice-bg-ssize\\.jpg$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, placeholder: BLURRED, width: 580)
        }
      }
      backgroundLarge: file(relativePath: { regex: "/^home\/img\/crypto-voice-bg-lsize\\.jpg$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, placeholder: BLURRED, width: 1150)
        }
      }
    }
  `)

  const getImages = {
    shield: withArtDirection(getImage(images.shieldLarge), [
      { media: '(max-width: 768px)', image: getImage(images.shieldSmall) },
    ]),
    background: withArtDirection(getImage(images.backgroundLarge), [
      { media: '(max-width: 768px)', image: getImage(images.backgroundSmall) },
    ]),
  }

  return (
    <a
      className="exodus__crypto-voice-banner"
      href={button.path}
      target="_blank"
      rel="noreferrer nofollow noopener"
      onClick={handleClick}
    >
      <div className="exodus__crypto-voice-banner__background">
        <GatsbyImage image={getImages.background} alt={description} />
      </div>
      <div className="exodus__crypto-voice-banner__content">
        {title && <h3 dangerouslySetInnerHTML={{ __html: title }} />}
        {description && <p dangerouslySetInnerHTML={{ __html: description }} />}
        {button.copy && <Button copy={button.copy} />}
      </div>
      <div className="exodus__crypto-voice-banner__brand">
        <GatsbyImage
          className="exodus__crypto-voice-banner__image"
          image={getImages.shield}
          alt={description}
        />
        <AmericaCryptoSvg />
      </div>
    </a>
  )
}

export default CryptoVoiceBanner
