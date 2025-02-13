// dependencies.
import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
// utils.
import buildImageObject from 'src/js/utils/buildImgObject'

// Styles & Images
// import 'src/components/pages/download/scss/TrezorSection.scss' TODO: move specific section SCSS

const device = {
  aspectRatio: 0.66198830409,
  path: '/download/img/',
  fileType: 'png',
  files: [{ fileName: 'trezor-318', width: 318 }],
}

// Main component:
const TrezorSection = ({ data }) => (
  <section className="x-trezor x__width">
    <div className="x-trezor__txt">
      <div className="x-trezor__image-container">
        <Img fluid={buildImageObject(device)} alt={data.alt} />
      </div>

      <h2>
        <span>{data.h2}</span>
      </h2>

      <span className="x-trezor__desc">{data.copy}</span>
    </div>

    <Link to={data.cta.path} className="x__button">
      <span className="x__button-align">
        <span className="x__button-align-text">{data.cta.copy}</span>
      </span>
    </Link>
  </section>
)

export default TrezorSection
