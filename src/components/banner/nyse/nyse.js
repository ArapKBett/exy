import classNames from 'classnames'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage, withArtDirection } from 'gatsby-plugin-image'
import React from 'react'

import Button from 'components/button'
import logEvent from 'js/analytics/logEvent'
import { MARCOM_NYSE_AMERICAN_BANNER } from 'js/analytics/trackers'

import './nyse.scss'

function NyseBanner({ title, description, button, fullWidth = false }) {
  const handleClick = () => {
    logEvent(MARCOM_NYSE_AMERICAN_BANNER)
  }

  const images = useStaticQuery(graphql`
    query {
      block: file(relativePath: { regex: "/^home\/img\/nyse-block\\.png$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, placeholder: BLURRED, width: 612)
        }
      }
      backgroundSmall: file(relativePath: { regex: "/^home\/img\/nyse-bg-ssize\\.jpg$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, placeholder: BLURRED, width: 576)
        }
      }
      backgroundMedium: file(relativePath: { regex: "/^home\/img\/nyse-bg-msize\\.jpg$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, placeholder: BLURRED, width: 1150)
        }
      }
      backgroundLarge: file(relativePath: { regex: "/^home\/img\/nyse-bg-lsize\\.jpg$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, placeholder: BLURRED, width: 2224)
        }
      }
    }
  `)

  const getImages = {
    block: getImage(images.block),
    background: withArtDirection(getImage(images.backgroundMedium), [
      { media: '(max-width: 768px)', image: getImage(images.backgroundSmall) },
    ]),
    backgroundFullWidth: withArtDirection(getImage(images.backgroundLarge), [
      {
        media: '(min-width: 769px) and (max-width: 992px)',
        image: getImage(images.backgroundMedium),
      },
      { media: '(max-width: 768px)', image: getImage(images.backgroundSmall) },
    ]),
  }

  return (
    <a
      className={classNames('exodus__nyse-banner', {
        'exodus__nyse-banner--full-width': fullWidth,
      })}
      href={button.path}
      target="_blank"
      rel="noreferrer nofollow noopener"
      onClick={handleClick}
    >
      <div className="exodus__nyse-banner__background">
        <GatsbyImage
          image={fullWidth ? getImages.backgroundFullWidth : getImages.background}
          alt={description}
        />
      </div>
      <div className="exodus__nyse-banner__content">
        {title ? <h3 dangerouslySetInnerHTML={{ __html: title }} /> : null}
        {description ? <p dangerouslySetInnerHTML={{ __html: description }} /> : null}
        {button.copy ? <Button copy={button.copy} size={fullWidth ? 'largest' : 'normal'} /> : null}
      </div>
      <div className="exodus__nyse-banner__image">
        <GatsbyImage image={getImages.block} alt={description} />
      </div>
    </a>
  )
}

export default NyseBanner
