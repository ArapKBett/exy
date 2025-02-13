import classNames from 'classnames'
import React from 'react'

import AppStats from 'data/AppStats.json'
import IconStarSvg from './icon-star'

import './rating.scss'

const sizeMap = {
  sm: 9,
  md: 12,
  lg: 16,
}

function Rating({ itemKey, starColor, starRating = false, ratingCount = true, size = 'sm' }) {
  const hasValidRating = AppStats[itemKey]?.starRating
  const hasValidCount = AppStats[itemKey]?.ratingsCount

  if ((starRating && !hasValidRating) || (ratingCount && !hasValidCount)) {
    return null
  }

  return (
    <span
      className={classNames('exodus__download__rating', {
        'exodus__download__rating--star': starRating,
        'exodus__download__rating--count': ratingCount,
        [size]: size,
      })}
    >
      {starRating && (
        <>
          <IconStarSvg color={starColor} size={sizeMap.lg} />
          {hasValidRating}
        </>
      )}
      {ratingCount && (
        <>
          <IconStarSvg size={sizeMap[size]} />
          <IconStarSvg size={sizeMap[size]} />
          <IconStarSvg size={sizeMap[size]} />
          <IconStarSvg size={sizeMap[size]} />
          <IconStarSvg size={sizeMap[size]} />
          <span>{`(${hasValidCount})`}</span>
        </>
      )}
    </span>
  )
}

export default Rating
