import classNames from 'classnames'
import React from 'react'

import './scss/header-investment-risk-banner.scss'

const bannerData = {
  copy: [
    "Don't invest unless you're prepared to lose all the money you invest.",
    'Crypto is a high-risk investment and you should not expect to be protected if something goes wrong.',
  ],
  cta: {
    copy: 'Take 2 mins to learn more',
    path: 'https://uk.exodus.com/uk-regulations',
  },
}

// main component.
const HeaderInvestmentRiskBanner = ({ stretch, data = bannerData, withPromoBanner = false }) => {
  return (
    <div
      className={classNames('x__investment-risk-banner', {
        'x__investment-risk-banner--header-collapsed': stretch,
        'x__investment-risk-banner--with-promo-banner': withPromoBanner,
      })}
    >
      <div className="x__investment-risk-banner__content">
        <p>
          {data.copy.length > 0 && data.copy.map((text, index) => <span key={index}>{text} </span>)}

          <a href={data.cta.path} target="_blank">
            {data.cta.copy}
          </a>
        </p>
      </div>
    </div>
  )
}

export default HeaderInvestmentRiskBanner
