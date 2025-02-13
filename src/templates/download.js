// dependencies.
import React from 'react'
// components.
import { Header, Footer } from 'src/components/layout'
import {
  AssetsSection,
  FeaturesSection,
  HeaderSection,
  TrezorSection,
} from 'src/components/pages/download'
// utils.
import { useLatestVersion } from 'js/utils/hooks/useLatestVersion'
// data.
import defaultData from 'src/data/pages/Contents/download.json'

/*
 * A template for the downloads page layout,
 * which is used both for the downloads and partner pages
 */

// Styles & Images
import 'static/download/scss/styles.scss'

// Main component:
const DownloadPage = ({
  pageContext,
  location,
  pageData = defaultData,
  pathname = 'en',
  enableSubscribeNotice = true,
  twitterEvents = {},
}) => {
  // get page data.
  const { content, footer } = pageData || pageContext.data
  const { header, trezor, assets, features } = content || defaultData.content
  const version = useLatestVersion()

  // return content.
  return (
    <div className="x-page-download">
      <Header pathname={pathname} social />
      <main className="x">
        {header && (
          <HeaderSection
            data={header}
            version={version}
            pathname={pathname}
            location={location}
            twitterEvents={twitterEvents}
          />
        )}
        {trezor && <TrezorSection data={trezor} />}
        {assets && <AssetsSection data={assets} />}
        {features && <FeaturesSection data={features} />}

        <Footer
          pathname={pathname}
          legalCopy={footer?.legalCopy}
          enableSubscribeNotice={enableSubscribeNotice}
          showPartners
        />
      </main>
    </div>
  )
}

export default DownloadPage
