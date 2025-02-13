import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage, withArtDirection } from 'gatsby-plugin-image'
import React from 'react'

import Button from 'components/button'

import './buy-crypto-banner.scss'

const BuyCryptoBanner = ({ title, description, button }) => {
  const images = useStaticQuery(graphql`
    query {
      devicesSmall: file(relativePath: { regex: "/^home\/img\/buy-crypto-devices-ssize\\.png$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, placeholder: BLURRED, width: 787)
        }
      }
      devicesLarge: file(relativePath: { regex: "/^home\/img\/buy-crypto-devices-lsize\\.png$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, placeholder: BLURRED, width: 1310)
        }
      }
      backgroundSmall: file(relativePath: { regex: "/^home\/img\/buy-crypto-bg-ssize\\.jpg$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, placeholder: BLURRED, width: 580)
        }
      }
      backgroundLarge: file(relativePath: { regex: "/^home\/img\/buy-crypto-bg-lsize\\.jpg$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, placeholder: BLURRED, width: 1150)
        }
      }
    }
  `)

  const getImages = {
    devices: withArtDirection(getImage(images.devicesLarge), [
      { media: '(max-width: 768px)', image: getImage(images.devicesSmall) },
    ]),
    background: withArtDirection(getImage(images.backgroundLarge), [
      { media: '(max-width: 768px)', image: getImage(images.backgroundSmall) },
    ]),
  }

  return (
    <a className="exodus__buy-crypto-banner" href={button.path} target="_self">
      <div className="exodus__buy-crypto-banner__background">
        <GatsbyImage image={getImages.background} alt={description} />
      </div>
      <div className="exodus__buy-crypto-banner__content">
        {title && <h3 dangerouslySetInnerHTML={{ __html: title }} />}
        {description && <p dangerouslySetInnerHTML={{ __html: description }} />}
        {button.copy && <Button copy={button.copy} />}
      </div>
      <div className="exodus__buy-crypto-banner__image">
        <GatsbyImage image={getImages.devices} alt={description} />
      </div>
    </a>
  )
}

export default BuyCryptoBanner
