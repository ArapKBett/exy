// dependencies.
import React from 'react'
import classNames from 'classnames'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
// components.
import Button from 'src/components/button'
// utils.
import useRellax from 'src/js/utils/hooks/useRellax'
// constants.
import { SITE_URL } from 'src/constants'

// Styles & Images
import 'src/components/banner/scss/FeatureBanner.scss'

// Partials:
const Assets = ({ assets = [] }) => {
  useRellax({ className: 'assets-rellax', center: true })

  return (
    assets.length > 0 &&
    assets.map((asset, index) => (
      <span
        key={index}
        className="x__asset assets-rellax"
        data-rellax-speed={index - 0.5}
        role="presentation"
      >
        <img src={`/img/logos/${asset}.svg`} alt={asset} />
      </span>
    ))
  )
}

const Content = ({ title, description }) => (
  <div className="x__content">
    {title && <span className="x__heading" dangerouslySetInnerHTML={{ __html: title }} />}
    {description && (
      <span className="x__subheading" dangerouslySetInnerHTML={{ __html: description }} />
    )}
  </div>
)

const ButtonSec = () => (
  <a
    href={`${SITE_URL}/learn-more/exodus-shares-sec`}
    target="_blank"
    rel="noreferrer noopener"
    className="x__button x__button--sec"
  >
    <span className="x__button-align">
      <span className="x__button-align-text">Review on the SEC Website</span>
    </span>
  </a>
)

const Buttons = ({ button, hasSecButton }) => (
  <div className={classNames('x__buttons', { 'x__buttons--highlight': button.highlighted })}>
    {hasSecButton && <ButtonSec />}

    {button.highlighted ? (
      <Link to={button.path} className="x__button">
        <span className="x__button-align">
          <span className="x__button-align-text">{button.copy}</span>
        </span>
      </Link>
    ) : (
      button.path && (
        <Button to={button.path} copy={button.copy} size="largest" target={button.target} active />
      )
    )}
  </div>
)

// Main component:
const FeatureBanner = ({
  title = 'Exodus <span class="x__break-sm">Public Offering</span>',
  description = 'Own a stake in the future of finance. Filed with the SEC.',
  button = { path: '/invest', copy: 'Learn more', highlighted: false },
  assets = [],
  previewImagePathname = 'en',
  hasSecButton = false,
}) => {
  // query images.
  const images = useStaticQuery(graphql`
    query {
      enSmall: file(relativePath: { regex: "/^home\/en\/img\/ramp-banner-devices-sm\\.png$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, placeholder: BLURRED, width: 787)
        }
      }
      enLarge: file(relativePath: { regex: "/^home\/en\/img\/ramp-banner-devices\\.png$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, placeholder: BLURRED, width: 1310)
        }
      }
      esSmall: file(relativePath: { regex: "/^home\/es\/img\/ramp-banner-devices-sm\\.png$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, placeholder: BLURRED, width: 787)
        }
      }
      esLarge: file(relativePath: { regex: "/^home\/es\/img\/ramp-banner-devices\\.png$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, placeholder: BLURRED, width: 1310)
        }
      }
    }
  `)
  const devicesImg = {
    en: {
      small: getImage(images.enSmall),
      large: getImage(images.enLarge),
    },
    es: {
      small: getImage(images.esSmall),
      large: getImage(images.esLarge),
    },
  }

  return (
    <div className="x__feature-banner">
      <div className="x__feature-banner__container">
        {assets.length > 0 && <Assets assets={assets} />}

        <div className="x__preview-img x__responsive-image">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet={devicesImg[previewImagePathname].small.images.fallback.src}
            />
            <source
              media="(min-width: 769px)"
              srcSet={devicesImg[previewImagePathname].large.images.fallback.src}
            />
            <img
              src={devicesImg[previewImagePathname].large.images.fallback.src}
              alt={description}
            />
          </picture>
        </div>

        <div className="x__feature-banner__wrapper">
          <Content title={title} description={description} />
        </div>

        <Buttons button={button} hasSecButton={hasSecButton} />
      </div>
    </div>
  )
}

export default FeatureBanner
