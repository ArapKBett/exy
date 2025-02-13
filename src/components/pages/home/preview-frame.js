import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useMemo } from 'react'

import AssetChromes from 'components/pages/home/header-asset-chromes'
import Video from 'components/video'
import { useDimensions } from 'js/utils/hooks'

import 'components/pages/home/scss/preview-frame.scss'

function PreviewFrame({ images, videos }) {
  const { isMobile } = useDimensions()

  const previewContent = useMemo(() => {
    if (isMobile) {
      if (videos.mp4 || videos.webm) {
        return (
          <Video
            alt="Mobile preview"
            className="__show"
            loading="eager"
            srcMp4={videos.mp4}
            srcPoster={getImage(images.mobile)}
            srcWebm={videos.webm}
          />
        )
      }

      return (
        <GatsbyImage
          image={getImage(images?.mobile)}
          className="__show"
          alt="Mobile preview"
          loading="eager"
        />
      )
    }

    return <GatsbyImage image={getImage(images.desktop)} alt="Desktop preview" loading="eager" />
  }, [isMobile, images, videos])

  return (
    <div className="exodus__preview-frame">
      <div className="exodus__preview-frame__border">
        <div className="exodus__preview-frame__content">{previewContent}</div>
      </div>

      <AssetChromes />
    </div>
  )
}

export default PreviewFrame
