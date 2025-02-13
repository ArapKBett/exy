// dependencies.
import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

// Styles & Images:
import 'src/components/layout/Footer/scss/ModuleCopyright.scss'

// Helpers:
const year = new Date().getFullYear()

// Main component:
const ModuleCopyright = () => (
  <div className="x__copyright">
    <div className="x__copyright__logo">
      <StaticImage src="../shared/img/exodus-logo.svg" alt="Exodus Logo" />
    </div>
    <div className="x__copyright__copy">
      Copyright &copy; {year} Exodus Movement, Inc. <br />
      Exodus was co-founded by Daniel Castagnoli and JP Richardson.
    </div>
  </div>
)

export default ModuleCopyright
