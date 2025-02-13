import { Link } from 'gatsby'
import React from 'react'

import LogosCarousel from 'components/logos-carousel'
import AnimatedNumber from 'js/utils/animate-numbers'
import { ASSETS_PAGE_PATH } from 'src/constants'

// Styles & Images
// import 'src/components/pages/download/scss/AssetsSection.scss' TODO: move specific section SCSS

// Main component:
const AssetsSection = ({ data }) => (
  <section className="x-assets-supported">
    <div className="x-assets-supported-content x__width text-center">
      <div
        id="asset-count-heading"
        className="x__assets-count-heading x__assets-count-heading--light"
      >
        <h2 className="x__heading">
          <span className="x__animated-number">
            <AnimatedNumber
              value={data.count}
              duration={1000}
              formatValue={(value) => value.toLocaleString()}
            />
            +
          </span>
          {data.h2}
        </h2>
      </div>
    </div>

    <div className="x-assets">
      <LogosCarousel />

      <Link to={ASSETS_PAGE_PATH} className="x__button x__button--shadow-light">
        <span className="x__button-align">
          <span className="x__button-align-text">{data.cta}</span>
        </span>
      </Link>
    </div>
  </section>
)

export default AssetsSection
