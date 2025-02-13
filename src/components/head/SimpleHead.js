import React from 'react'

import { SITE_URL, X_USERNAME } from 'src/constants'

export default function SimpleHead({
  path,
  title,
  description,
  keywords,
  thumbnail = 'https://www.exodus.com/img/favicons/apple-icon-152x152.png?v=3',
  appName = 'Exodus',
  socialImg = 'https://www.exodus.com/img/og-image.jpg',
  socialImgRect = 'https://www.exodus.com/img/og-image-rect.jpg',
  noindex = false,
}) {
  const canonicalUrl = path ? `${SITE_URL}/${path}` : SITE_URL
  const twitterUsername = `@${X_USERNAME}`

  return (
    <>
      {title ? <title>{title}</title> : null}
      {description ? <meta name="description" content={description} /> : null}
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta name="robots" content={noindex ? 'noindex' : 'index'} />
      <meta name="googlebot-news" content="noindex" />
      <meta name="thumbnail" content={thumbnail} />
      <meta name="application-name" content={appName} />
      <link rel="canonical" href={canonicalUrl} />
      {/* iOS */}
      <meta name="apple-mobile-web-app-title" content={title} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterUsername} />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImg} />
      <meta name="twitter:image:width" content="837" />
      <meta name="twitter:image:height" content="837" />
      {/* Facebook OG */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={appName} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={socialImgRect} />
      <meta property="og:image:secure_url" content={socialImgRect} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1600" />
      <meta property="og:image:height" content="837" />
    </>
  )
}
