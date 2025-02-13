// dependencies.
import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import Carousel from 'react-bootstrap/Carousel'

// Main component.
const ResponsiveCarousel = (props) => {
  const {
    dark,
    interval,
    children,
    className,
    innerClassName,
    outerClassName,
    id,
    carouselId,
    controls,
    carouselItemClass,
    noCarouselContainerClass,
    activeOnLargeScreens,
    maxItemsPerSection,
    largeCarouselSectionClassName,
    responsiveCutoff,
    normalizeHeights,
  } = props

  const ref = useRef(null)
  const [widthLessThanCutoff, setWidthLessThanCutoff] = useState(false)

  useEffect(() => {
    // decide whether or not to show Carousel
    const evaluate = () => {
      if (window.innerWidth < (responsiveCutoff || 768)) {
        setWidthLessThanCutoff(true)
      } else {
        setWidthLessThanCutoff(false)
      }
    }

    window.addEventListener('resize', evaluate)
    window.addEventListener('orientationchange', evaluate)

    evaluate()

    // Normalize carousel item heights
    if (normalizeHeights) {
      const container = ref.current

      const runNormalizeHeights = () => {
        let items = container.querySelectorAll('.carousel-item')
        if (!widthLessThanCutoff) {
          items = container.querySelector('.carousel-inner').children
        }
        const heights = Array.from(items).map((item) => item.offsetHeight)
        const tallest = Math.max(...heights)
        Array.from(items).forEach((item) => {
          item.style.minHeight = `${tallest}px`
        })
      }

      // waitForImages equivalent in vanilla JS
      const images = container.querySelectorAll('img')
      let imagesLoaded = 0
      images.forEach((img) => {
        img.onload = () => {
          imagesLoaded++
          if (imagesLoaded === images.length) {
            runNormalizeHeights()
          }
        }
      })

      window.addEventListener('resize', runNormalizeHeights)
      window.addEventListener('orientationchange', runNormalizeHeights)
    }

    return () => {
      window.removeEventListener('resize', evaluate)
      window.removeEventListener('orientationchange', evaluate)
    }
  }, [responsiveCutoff, normalizeHeights, widthLessThanCutoff])

  const carouselProps = {
    id: carouselId,
    className,
    interval: interval || 5000,
    style: { display: 'flex', flexDirection: 'column-reverse' },
    controls: !!controls,
  }

  let content

  if (widthLessThanCutoff) {
    content = (
      <Carousel {...carouselProps}>
        {React.Children.map(children, (child, i) => {
          return <Carousel.Item className={carouselItemClass}>{child}</Carousel.Item>
        })}
      </Carousel>
    )
  } else if (activeOnLargeScreens) {
    const numberOfCarouselItems = Math.ceil(children.length / maxItemsPerSection)

    content = (
      <Carousel {...carouselProps}>
        {[...Array(numberOfCarouselItems).keys()].map((i) => (
          <div key={`large-carousel-item-${i}`}>
            <div className={largeCarouselSectionClassName}>
              {React.Children.map(
                children.slice(i * maxItemsPerSection, (i + 1) * maxItemsPerSection),
                (child, i) => {
                  return child
                }
              )}
            </div>
          </div>
        ))}
      </Carousel>
    )
  } else {
    content = (
      <div className={noCarouselContainerClass || className} style={{ display: 'block' }}>
        <div className={classNames(innerClassName, 'carousel-inner')}>{children}</div>
      </div>
    )
  }

  return (
    <div
      id={id}
      className={classNames(outerClassName, {
        'carousel-dark': dark,
        active: widthLessThanCutoff,
      })}
      style={{ width: '100%' }}
      ref={ref}
    >
      {content}
    </div>
  )
}

export default ResponsiveCarousel
