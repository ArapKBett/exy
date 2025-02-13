import classNames from 'classnames'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { forwardRef } from 'react'

import Video from 'components/video'
import useDimensions from 'js/utils/hooks/useDimensions'

import 'components/pages/shared/scss/background.scss'

function Background({ alt, images, withBanner = false, ...rest }, ref) {
  const { bgImage, bgParticles } = images
  const { poster, mp4, webm } = bgParticles

  const { isMobile } = useDimensions()

  return (
    <div
      ref={ref}
      className={classNames(`exodus__background-container`, {
        'exodus__background-container--with-banner': withBanner,
      })}
      {...rest}
    >
      {!isMobile && bgParticles && (
        <Video
          alt={alt || 'particles'}
          className="exodus__particles"
          loading="eager"
          srcMp4={mp4}
          srcPoster={poster}
          srcWebm={webm}
          forceMobilePoster
        />
      )}
      {bgImage && (
        <div className="exodus__background">
          <GatsbyImage image={bgImage} alt={alt || 'background'} loading="eager" />
        </div>
      )}
    </div>
  )
}

export default forwardRef(Background)
