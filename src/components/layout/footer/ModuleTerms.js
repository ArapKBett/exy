// dependencies.
import React from 'react'

// Styles & Images:
import 'src/components/layout/Footer/scss/ModuleTerms.scss'

// partials.
const defaultCopy = [
  'Exodus is a software platform ONLY and does not conduct any independent diligence on or substantive review of any blockchain asset, digital currency, cryptocurrency or associated funds. You are fully and solely responsible for evaluating your investments, for determining whether you will swap blockchain assets based on your own, and for all your decisions as to whether to swap blockchain assets with the Exodus in app swap feature. In many cases, blockchain assets you swap on the basis of your research may not increase in value, and may decrease in value. Similarly, blockchain assets you swap on the basis of your research may increase in value after your swap.',
  'Past performance is not indicative of future results. Any investment in blockchain assets involves the risk of loss of part or all of your investment. The value of the blockchain assets you swap is subject to market and other investment risks.',
  'Exodus users are responsible for storing their own recovery phrase. If the recovery phrase is lost, the user might not be able to retrieve their private keys.',
]

// main component.
const ModuleTerms = ({ copy = [], legalLinks, showPartners }) => {
  const legalCopy = copy.length > 0 ? copy : defaultCopy
  const { privacy, terms } = legalLinks

  return (
    <div className="x__terms">
      {legalCopy.map((text, index) => (
        <span key={index}>{text}</span>
      ))}
      {showPartners && (
        <span>
          Partnered with{' '}
          <a href="https://www.moonpay.com/" target="_blank">
            MoonPay
          </a>
        </span>
      )}

      <span>
        {privacy && (
          <a target="_blank" rel="noreferrer noopener" href={privacy.href}>
            {privacy.title}
          </a>
        )}
        {terms && (
          <a target="_blank" rel="noreferrer noopener" href={terms.href}>
            {terms.title}
          </a>
        )}
      </span>
    </div>
  )
}

export default ModuleTerms
