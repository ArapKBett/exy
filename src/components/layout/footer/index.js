// dependencies.
import React from 'react'
import classNames from 'classnames'
// components.
import SubscribeModule from 'src/components/newsletter/Subscribe/subscribe-module'
import SubscribePopup from 'src/components/newsletter/Subscribe/subscribe-popup'
import ModuleSocial from 'components/layout/shared/social-networks'
import ModuleNavigation from 'src/components/layout/Footer/ModuleNavigation'
import ModuleCopyright from 'src/components/layout/Footer/ModuleCopyright'
import ModuleTerms from 'src/components/layout/Footer/ModuleTerms'
import ModuleIntercom from 'src/components/layout/Footer/ModuleIntercom'
// data.
import { legalItems, navigationItems } from 'src/data/pages/Navigation'

// Styles & Images:
import 'src/components/layout/Footer/scss/style.scss'

// Constants:
import { isUk } from 'src/constants'

// Main component:
const Footer = ({
  pathname = 'en',
  variant = 'product',
  legalCopy,
  enableSubscribeNotice = true,
  backgroundColor,
  black = false,
  noBorder = false,
  intercom = true,
  showPartners = false,
  withDownloadBanner = false,
}) => {
  // Navigation data.
  const legalData = legalItems(pathname)
  const navigationData = navigationItems(pathname)

  return (
    <footer
      className={classNames('x__footer', {
        'x__footer--black': black,
        'x__footer--no-border': noBorder,
      })}
      style={{ backgroundColor }}
    >
      <div className="x__footer__content">
        <div className="x__footer__content-top">
          <ModuleNavigation data={navigationData} />
          {!isUk && <SubscribeModule />}
        </div>
        <div className="x__footer__content-center row">
          <div className={isUk ? 'col col-md-12 col-12' : 'col col-md-7 col-12'}>
            <ModuleCopyright />
          </div>
          {!isUk && (
            <div className="col col-md-5 col-12">
              <ModuleSocial large />
            </div>
          )}
        </div>

        <div className="x__footer__content-bottom row">
          <div className="col col-12">
            <ModuleTerms copy={legalCopy} legalLinks={legalData} showPartners={showPartners} />
          </div>
        </div>
      </div>

      {enableSubscribeNotice && !isUk && (
        <SubscribePopup variant={variant} withDownloadBanner={withDownloadBanner} />
      )}
      {intercom ? <ModuleIntercom /> : null}
    </footer>
  )
}

export default Footer
