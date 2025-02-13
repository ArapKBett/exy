import classNames from 'classnames'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useEffect, useRef, useState } from 'react'

import useDimensions from 'js/utils/hooks/useDimensions'
import usePrefersReducedMotion from 'js/utils/hooks/use-prefers-reduced-motion'

function Video({
  srcPoster,
  srcMp4,
  srcWebm,
  alt,
  className,
  forceMobilePoster = false,
  loading = 'lazy',
}) {
  const reducedMotion = usePrefersReducedMotion()
  const videoRef = useRef(null)
  const [canPlayVideo, setCanPlayVideo] = useState(true)

  const { isMobile } = useDimensions()

  useEffect(() => {
    const video = videoRef?.current

    const tryAutoPlay = async () => {
      try {
        await video?.play()
        setCanPlayVideo(true)
      } catch (error) {
        setCanPlayVideo(false)
      }
    }

    if (!reducedMotion && video) {
      tryAutoPlay()
    }

    return () => {
      video?.pause()
    }
  }, [reducedMotion])

  useEffect(() => {
    const video = videoRef?.current

    const handleControlCheck = () => {
      if (video?.controls || video?.paused) {
        setCanPlayVideo(false)
      }
    }

    if (video) {
      video.addEventListener('controlschanged', handleControlCheck)
      video.addEventListener('pause', handleControlCheck)

      return () => {
        video.removeEventListener('controlschanged', handleControlCheck)
        video.removeEventListener('pause', handleControlCheck)
      }
    }
  }, [videoRef?.current])

  const shouldShowPoster = reducedMotion || !canPlayVideo || (!srcMp4 && !srcWebm)

  return (
    <div
      className={classNames('exodus__video', className, {
        [`${className}--poster`]: shouldShowPoster,
        'exodus__video--poster': shouldShowPoster,
        [`${className}--force-mobile-poster`]: forceMobilePoster,
        'exodus__video--force-mobile-poster': forceMobilePoster,
      })}
    >
      {shouldShowPoster || (isMobile && forceMobilePoster) ? (
        <GatsbyImage image={srcPoster} alt={alt} loading={loading} />
      ) : (
        <video ref={videoRef} autoPlay loop muted playsInline controls={false}>
          {srcMp4 && <source src={srcMp4} type="video/mp4" />}
          {srcWebm && <source src={srcWebm} type="video/webm" />}
        </video>
      )}
    </div>
  )
}

export default Video
