// dependencies.
import React from 'react'
// constants.
import { SITE_URL, X_USERNAME } from 'src/constants'
// data.
import { DefaultData } from 'src/data/head'

// Main component:
const PageHead = ({
  path,
  title,
  description,
  keywords,
  thumbnail,
  appName,
  appTitle,
  socialImg,
  socialImgRect,
  page = 'default',
  src = 'Contents',
  nocache = false,
  noindex = false,
  nocanonical = false,
  children,
}) => {
  /*
   * Creates Meta tags for every page pulling data from `./src/data/head/Head.js`
   * Leave the data prop unchanged to get the default values.
   */

  /* Load page-specific meta data for main content pages and templates */
  const PageData = require(`src/data/pages/${src}/${page}.json`)
  const ContentData = require(`src/data/head/default-${src}-tags.json`)
  /* Select which data should be rendered */
  const getData = (key) => PageData[key] || ContentData[key] || DefaultData[key]
  /* URLs */
  const getPath = () => {
    const p = path || getData('canonicalPath') || getData('path')
    if (['', 'index'].includes(p)) return SITE_URL
    return `${SITE_URL}/${p}`
  }
  const canonicalUrl = getPath()

  /* Return meta tags */
  return (
    <>
      <title>{title || getData('title')}</title>
      <meta name="description" content={description || getData('description')} />
      <meta name="keywords" content={keywords || getData('keywords')} />
      <meta name="robots" content={noindex ? 'noindex' : 'index'} />
      <meta name="googlebot-news" content="noindex" />
      <meta name="thumbnail" content={thumbnail || getData('thumbnail')} />
      <meta name="application-name" content={appName || getData('appName')} />
      {!nocanonical && <link rel="canonical" href={canonicalUrl} />}
      {/* iOS */}
      <meta name="apple-mobile-web-app-title" content={appTitle || getData('appTitle')} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={`@${X_USERNAME}`} />
      <meta name="twitter:creator" content={`@${X_USERNAME}`} />
      <meta name="twitter:title" content={title || getData('title')} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:description" content={description || getData('description')} />
      <meta name="twitter:image" content={socialImg || getData('socialImg')} />
      <meta name="twitter:image:width" content="837" />
      <meta name="twitter:image:height" content="837" />
      {/* Facebook OG */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={appTitle || getData('appTitle')} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title || getData('title')} />
      <meta property="og:description" content={description || getData('description')} />
      <meta property="og:image" content={socialImgRect || getData('socialImgRect')} />
      <meta property="og:image:secure_url" content={socialImgRect || getData('socialImgRect')} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1600" />
      <meta property="og:image:height" content="837" />
      {/* No Cache. 'key' prevents console warning */}
      {nocache && [
        <meta key={1} httpEquiv="cache-control" content="no-cache, no-store, must-revalidate" />,
        <meta key={2} httpEquiv="expires" content="0" />,
        <meta key={3} httpEquiv="pragma" content="no-cache" />,
      ]}

      {/* Any extra <head> elements */}
      {children}
    </>
  )
}

export default PageHead
