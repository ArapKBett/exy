import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'

import useDimensions from 'js/utils/hooks/useDimensions'

import 'components/pages/home/scss/testimonials-section.scss'

const images = {
  '99bitcoins': require('static/home/img/99bitcoins.svg').default,
  coinbureau: require('static/home/img/coinbureau.svg').default,
  investopedia: require('static/home/img/investopedia.svg').default,
  trustpilot: require('static/home/img/trustpilot.svg').default,
}

function Indicators({ count, activeIndex, onClick }) {
  const buildArray = Array.from({ length: count }, (_, index) => index)

  return (
    <ol className="exodus__testimonials-dots">
      {buildArray.map((index) => (
        <li
          key={index}
          className={index === activeIndex ? 'active' : ''}
          onClick={() => onClick(index)}
        />
      ))}
    </ol>
  )
}

function ArrowButton({ type = 'prev', onClick }) {
  return (
    <button
      className={classNames('exodus__testimonials-arrows', {
        right: type === 'next',
        left: type === 'prev',
      })}
      onClick={onClick}
    >
      {type === 'prev' ? 'Prev' : 'Next'}
    </button>
  )
}

function CarouselItem({ item, active }) {
  const { copy, url, logo, author } = item

  return (
    <div className={classNames('exodus__testimonials-item', { active })}>
      <div>
        <p>{copy}</p>

        <a href={url} target="_blank" rel="noreferrer noopener">
          <img src={images[logo]} alt={`${author} logo`} />
          <span>{author}</span>
        </a>
      </div>
    </div>
  )
}

function TestimonialsSection({ data, interval = 5000, disableArrows = false }) {
  const timeoutRef = useRef(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState(0)
  const [touchEndX, setTouchEndX] = useState(0)

  const { isMobile } = useDimensions()

  const shouldDisableArrows = disableArrows || isMobile

  const handlePrevClick = () => {
    const newIndex = activeIndex - 1
    setActiveIndex(newIndex >= 0 ? newIndex : data.length - 1)
  }
  const handleNextClick = () => {
    const newIndex = activeIndex + 1
    setActiveIndex(newIndex <= data.length - 1 ? newIndex : 0)
  }
  const handleIndicatorClick = (index) => {
    setActiveIndex(index)
  }

  // Auto-play.
  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(() => handleNextClick(), interval)

    return () => resetTimeout()
  }, [activeIndex])

  // Swipeable / Touch events.
  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].screenX)
  }

  const handleTouchEnd = (e) => {
    setTouchEndX(e.changedTouches[0].screenX)

    if (!touchStartX || !touchEndX) return

    const MIN_SWIPE_DISTANCE = 24
    const swipeDistance = touchStartX - touchEndX

    if (swipeDistance > MIN_SWIPE_DISTANCE) handleNextClick()
    if (swipeDistance < -MIN_SWIPE_DISTANCE) handlePrevClick()
  }

  if (!data || data.length === 0) return null

  // Return content.
  return (
    <>
      <section
        className={classNames('x__index-page__testimonials', {
          'x__index-page__testimonials--no-arrows': shouldDisableArrows,
        })}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {!shouldDisableArrows && <ArrowButton type="prev" onClick={handlePrevClick} />}
        <div
          className="x__index-page__testimonials__content"
          style={{
            transform: `translateX(${(100 / data.length) * (activeIndex * -1)}%)`,
            width: `${100 * data.length}%`,
          }}
        >
          {data.map((item, index) => (
            <CarouselItem key={index} item={item} active={index === activeIndex} />
          ))}
        </div>
        {!shouldDisableArrows && <ArrowButton type="next" onClick={handleNextClick} />}
        <Indicators count={data.length} activeIndex={activeIndex} onClick={handleIndicatorClick} />
      </section>
    </>
  )
}

export default TestimonialsSection
