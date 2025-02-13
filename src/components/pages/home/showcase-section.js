import classNames from 'classnames'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'

import Button from 'components/button'
import { useDimensions } from 'js/utils/hooks'

import 'components/pages/home/scss/showcase-section.scss'

function SwapSection({ id, data, variant = 0, withSmallImage = false }) {
  const { h2, h3, description, cta, image } = data

  const { isMobile } = useDimensions()

  // get images.
  const backgroundGlowImages = useStaticQuery(graphql`
    query {
      variant0: file(relativePath: { regex: "/^home\/img\/showcase-glow-0\\.png$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, width: 2400, placeholder: BLURRED)
        }
      }
      variant1: file(relativePath: { regex: "/^home\/img\/showcase-glow-1\\.png$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, width: 2400, placeholder: BLURRED)
        }
      }
      variant2: file(relativePath: { regex: "/^home\/img\/showcase-glow-2\\.png$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, width: 2400, placeholder: BLURRED)
        }
      }
      variant3: file(relativePath: { regex: "/^home\/img\/showcase-glow-3\\.png$/" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, width: 2400, placeholder: BLURRED)
        }
      }
    }
  `)

  const backgroundImage = [
    getImage(backgroundGlowImages.variant0),
    getImage(backgroundGlowImages.variant1),
    getImage(backgroundGlowImages.variant2),
    getImage(backgroundGlowImages.variant3),
  ]

  return (
    <>
      <section
        id={id}
        className={classNames(`exodus__showcase exodus__showcase--variant-${variant}`, {
          [`exodus__showcase exodus__showcase--variant-${variant}--small-image`]: withSmallImage,
        })}
      >
        {!isMobile && (
          <GatsbyImage
            className="exodus__showcase__background"
            image={backgroundImage[variant]}
            alt="background"
            loading="lazy"
          />
        )}

        <div className="exodus__showcase__content">
          {h2 && (
            <h2 className="exodus__showcase__heading" dangerouslySetInnerHTML={{ __html: h2 }} />
          )}
          {h3 && (
            <h3 className="exodus__showcase__subheading" dangerouslySetInnerHTML={{ __html: h3 }} />
          )}
          {image && (
            <div className="exodus__showcase__image">
              <GatsbyImage image={image} alt={h2} loading="lazy" />
              {description && (
                <div className="exodus__showcase__description">
                  <p dangerouslySetInnerHTML={{ __html: description }} />
                </div>
              )}
            </div>
          )}
          {cta.path && cta.copy && (
            <div className="exodus__showcase__actions">
              <Button to={cta.path} copy={cta.copy} size="largest" />
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default SwapSection
