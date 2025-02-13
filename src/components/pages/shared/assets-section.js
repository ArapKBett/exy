import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'

import AssetIcon from 'components/assets/shared/AssetIcon'
import Button from 'components/button'
import useDimensions from 'js/utils/hooks/useDimensions'
import useFetchSimplifiedAssets from 'js/assets/hooks/useFetchSimplifiedAssets'

import 'components/pages/shared/scss/assets-section.scss'

function Web3Section({ id, data }) {
  const { h2, h3, assets: assetList, cta, backgroundImage } = data

  const { isMobile } = useDimensions()
  const { assets } = useFetchSimplifiedAssets(assetList)

  return (
    <section id={id} className="x__assets-section">
      {!!backgroundImage && !isMobile && (
        <GatsbyImage
          className="x__assets-section__background"
          image={backgroundImage}
          alt="background"
          loading="lazy"
        />
      )}
      <div className="x__assets-section__content">
        {!!h2 && <h2 dangerouslySetInnerHTML={{ __html: h2 }} />}
        {!!h3 && <h3 dangerouslySetInnerHTML={{ __html: h3 }} />}
        {!!assets && (
          <div className="x__assets-section__assets">
            {assets.map(({ name, ticker, icon }) => (
              <AssetIcon
                key={`${name}-${ticker}`}
                icon={icon}
                name={name}
                ticker={ticker}
                size="100"
              />
            ))}
          </div>
        )}
        {!!cta.path && !!cta.copy && (
          <div className="x__assets-section__actions">
            <Button to={cta.path} copy={cta.copy} size="largest" />
          </div>
        )}
      </div>
    </section>
  )
}

export default Web3Section
