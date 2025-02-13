import { graphql } from 'gatsby'
import React from 'react'

import SimpleHead from 'components/head/SimpleHead'
import pageData from 'data/pages/Contents/home.json'
import HomepageLayout from 'templates/homepage'

const IndexPage = ({ data: images, location }) => (
  <HomepageLayout images={images} location={location} pageData={pageData} />
)

export const query = graphql`
  query {
    previewDesktop: file(relativePath: { regex: "/^home\/en\/img\/header-desktop-preview\\.png$/" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, width: 2224, placeholder: BLURRED)
      }
    }
    previewMobile: file(relativePath: { regex: "/^home\/en\/img\/header-mobile-preview\\.png$/" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, width: 490, placeholder: BLURRED)
      }
    }
    swapMobile: file(relativePath: { regex: "/^home\/en\/img\/image-swap-m\\.png$/" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, width: 850, placeholder: BLURRED)
      }
    }
    swapDesktop: file(relativePath: { regex: "/^home\/en\/img\/image-swap-d\\.png$/" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, width: 2497, placeholder: BLURRED)
      }
    }
    stakeMobile: file(relativePath: { regex: "/^home\/en\/img\/image-stake-m\\.png$/" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, width: 880, placeholder: BLURRED)
      }
    }
    stakeDesktop: file(relativePath: { regex: "/^home\/en\/img\/image-stake-d\\.png$/" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, width: 2267, placeholder: BLURRED)
      }
    }
    tokensMobile: file(relativePath: { regex: "/^home\/en\/img\/image-tokens-m\\.png$/" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, width: 884, placeholder: BLURRED)
      }
    }
    tokensDesktop: file(relativePath: { regex: "/^home\/en\/img\/image-tokens-d\\.png$/" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, width: 2335, placeholder: BLURRED)
      }
    }
    hardwareMobile: file(relativePath: { regex: "/^home\/en\/img\/image-hardware-m\\.png$/" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, width: 884, placeholder: BLURRED)
      }
    }
    hardwareDesktop: file(relativePath: { regex: "/^home\/en\/img\/image-hardware-d\\.png$/" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, width: 2335, placeholder: BLURRED)
      }
    }
    hardwareMobileLedger: file(relativePath: { regex: "/^home\/en\/img\/image-hardware-ledger-m\\.png$/" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, width: 884, placeholder: BLURRED)
      }
    }
    hardwareDesktopLedger: file(relativePath: { regex: "/^home\/en\/img\/image-hardware-ledger-d\\.png$/" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, width: 2335, placeholder: BLURRED)
      }
    }
  }
`

export default IndexPage

export const Head = () => {
  const { title, description, keywords } = pageData

  return <SimpleHead title={title} description={description} keywords={keywords} />
}
