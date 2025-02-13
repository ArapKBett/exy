// Env
export const isDev = process.env.NODE_ENV === 'development'

// Domains & URLs
export const SITE_NAME = 'Exodus'

export const DOMAIN = 'exodus.com'

export const SITE_URL = `https://www.${DOMAIN}`
export const UK_URL = `https://uk.${DOMAIN}`
export const CONTACT_URL = `${SITE_URL}/contact`
export const DEV_URL = `https://dev.${DOMAIN}`
export const DOWNLOAD_URL = `${SITE_URL}/download`
export const DOWNLOADS_URL = `https://downloads.${DOMAIN}/releases`
export const EXTENSION_URL = `https://extension.${DOMAIN}/releases`
export const LEGAL_URL = `${SITE_URL}/legal`
export const NEWS_URL = `${SITE_URL}/news`
export const PRIVACY_URL = `${SITE_URL}/privacy`
export const REFERRALS_URL = `https://referrals.${DOMAIN}`
export const SUPPORT_URL = `https://support.${DOMAIN}`
export const TERMS_URL = `${SITE_URL}/terms`
export const PREVIEW_WORKER_URL = `*.exodus.workers.dev`
export const PASSKEYS_WEBSITE_URL = 'https://passkeys.foundation'
export const PASSKEYS_STAGING_WEBSITE_URL = 'https://staging.passkeys.foundation'
export const PASSKEYS_DEV_WEBSITE_URL = 'https://dev.passkeys.foundation'
export const PASSKEYS_PREVIEW_URL = `*.passkeys-website.pages.dev`
export const LOCALHOST_URL = 'https://localhost:3000'

// Subsite Checks
export const isWww = process.env.SUBSITE === 'www'
export const isUk = process.env.SUBSITE === 'uk'

// Paths: RENAME
export const DOWNLOAD_PAGE_PATH = '/download'
export const WEB3_PAGE_PATH = '/web3-wallet'
export const MOBILE_PAGE_PATH = '/mobile'
export const DESKTOP_PAGE_PATH = '/desktop'
export const ASSETS_PAGE_PATH = '/assets'
export const APPS_PAGE_PATH = '/apps'
export const TREZOR_PAGE_PATH = '/trezor-wallet'
export const NEWSLETTER_PATH = '/newsletter'

// Email addresses
export const CAREERS_EMAIL = `jobs@${DOMAIN}`
export const TALENT_EMAIL = `talent@${DOMAIN}`
export const SUPPORT_EMAIL = `support@${DOMAIN}`
export const INVESTORS_EMAIL = `investors@${DOMAIN}`
export const LEGAL_EMAIL = `legal@${DOMAIN}`
export const DATA_EMAIL = `data@${DOMAIN}`

// API & URLs
export const HELPERS_URL = 'https://support-helpers.a.exodus.io'
export const REMOTE_CONFIG_URL = 'https://remote-config.exodus.io/v1/exodus.json'
export const EXCHANGE_API_URL = 'https://exchange.exodus.io'
export const PRICE_FEED_API_URL = 'https://pricing.a.exodus.io'
export const COUNTRIES_API_URL = `/api/is-eu-country`
export const SHARES_PUBLIC_API_URL = 'https://marley-p.exodus.io/public-api'
export const SHARES_MAX_USD_INVESTMENT = 75000000
export const FIAT_SERVER_URL_SANDBOX = 'https://fiat-s.a.exodus.io/'
const FIAT_SERVER_URL_PRODUCTION = 'https://fiat.a.exodus.io/'
export const FIAT_SERVER_URL = isDev ? FIAT_SERVER_URL_SANDBOX : FIAT_SERVER_URL_PRODUCTION
export const GREENHOUSE_URL = 'https://boards.greenhouse.io/exodus54'
export const INVESTORS_URL = 'https://investors.exodus.com/investors'

// Mobile Apps
export const APPLE_STORE_APP_ID = 1414384820
export const APPLE_STORE_AFFILIATE_DATA = 'pt=118366236&ct=download'
export const IOS_APP_URL = `https://apps.apple.com/app/apple-store/id${APPLE_STORE_APP_ID}?${APPLE_STORE_AFFILIATE_DATA}&mt=8`
export const PLAY_STORE_APP_ID = 'exodusmovement.exodus'
export const ANDROID_APP_URL = `https://play.google.com/store/apps/details?id=${PLAY_STORE_APP_ID}`
// Browser Extension
export const INSTALL_EXTENSION_URL = 'https://www.exodus.com/install-forwarder/extension/'
export const BROWSER_EXTENSION_BUILDS = ['browser', 'nile']

// Trezor
export const TREZOR_URL = 'https://trezor.go2cloud.org/aff_c?offer_id=133&aff_id=2683'
// Swagbucks
export const SWAGBUCKS_URL = 'https://sboffers.swagbucks.com/GP8A5'
// Trustpilot
export const TRUSTPILOT_APP_ID = '5c9d1556164d370001825424'
export const TRUSTPILOT_URL = 'https://www.trustpilot.com/review/exodus.com'
// Reddit
export const REDDIT_PIXEL_ID = 't2_c6meqdng'
export const REDDIT_PIXEL_URL = 'https://www.redditstatic.com/ads/pixel.js'
// Meta
export const META_PIXEL_ID = '1316946818800961'
export const META_PIXEL_URL = 'https://connect.facebook.net/en_US/fbevents.js'
// TikTok
export const TIKTOK_PIXEL_ID = 'C8JRSK4B7AN1JESF6I5G'
export const TIKTOK_PIXEL_URL = 'https://analytics.tiktok.com/i18n/pixel/events.js'
// Twitter
export const TWITTER_PIXEL_ID = 'o0arj'
export const TWITTER_PIXEL_URL = 'https://static.ads-twitter.com/uwt.js'

// Social profiles
export const DISCORD_URL = 'http://discord.gg/exodus'
export const FACEBOOK_URL = 'https://www.facebook.com/exodus.io'
export const GITHUB_URL = 'https://github.com/ExodusMovement'
export const INSTAGRAM_URL = 'https://www.instagram.com/exodus'
export const REDDIT_URL = 'https://www.reddit.com/r/ExodusWallet'
export const X_USERNAME = 'exodus'
export const X_URL = `https://x.com/${X_USERNAME}`
export const YOUTUBE_URL = 'https://www.youtube.com/c/exodus'

// Flags
export const BROWSER_EXTENSION_WEBSTORE_ENABLED = true
export const HEADER_PROMO_BANNER_ENABLED = false
export const HOMEPAGE_CRYPTO_VOICE_BANNER_ENABLED = false
export const HOMEPAGE_NYSE_BANNER_ENABLED = true
export const HOMEPAGE_RAMP_BANNER_ENABLED = true
export const INVESTORS_SHOW_SINGLE_EVENT = false
export const INVESTORS_SHOW_NEWSLETTER_BANNER = true
export const INVESTORS_SHOW_SECURITIZE_BANNER = false
export const INVESTORS_SHOW_SECURITIZE_SECTION = false
export const NEWSLETTER_GROUPS_ENABLED = false
export const SHOW_AUTO_STATUS_MESSAGES = false
export const SUBSCRIBE_PREFERENCES_SUSPENDED = false
export const SUBSCRIBE_SUSPENDED = false
export const WAAS_LEAD_SUBSCRIBE_ENABLED = true
export const VIP_SUPPORT_PLUS_ENABLED = false
export const REFERRAL_BANNER_ENABLED = false
export const LEDGER_WALLET_ENABLED = false

// Download links
export const ASSETPAGE_DESKTOP_DOWNLOAD_LINK = ['btc', 'xmr']
export const ASSETPAGE_MOBILE_DOWNLOAD_LINK = ['btc', 'xmr']
export const ASSETPAGE_WEB3_DOWNLOAD_LINK = ['btc']
export const DOWNLOAD_LINK_OS_KEYS = {
  web3: ['web3', 'Web3'],
  ios: ['ios', 'iOS'],
  android: ['android', 'Android'],
  win: ['windows', 'Windows'],
  mac: ['macos', 'MacOS_Intel'],
  macMs: ['macos-m1', 'MacOS_Ms'],
  lin: ['linux-deb', 'Linux_DEB'],
  linZip: ['linux-zip', 'Linux_ZIP'],
}
export const DOWNLOAD_PLATFORMS = {
  desktop: ['Desktop', 'desktop'],
  mobile: ['Mobile', 'mobile'],
  web3: ['Extension', 'browser-extension'],
}

// Currencies
export const CURRENCY = 'USD'
export const CURRENCY_SYMBOL = '$'

// Email marketing, user subscriptions
export const BROWSER_EXTENSION_BETA_WAITLIST_ID = '2'

// Information
export const COMPANY_ADDRESS = {
  name: 'Exodus Movement, Inc.',
  address: '15418 Weir Street',
  address_line2: '#333',
  address_line_2: 'No. 333',
  city: 'Omaha',
  state: 'Nebraska',
  st: 'NE',
  zip: 68137,
  country: 'United States',
}

// Intercom
export const INTERCOM_MESSENGER_ID = 'edr429y3'
export const INTERCOM_MESSENGER_COLOR = '#8359ff'
export const INTERCOM_STATUS_ARTICLE_ID = '9060545'

// Hotjar
export const HOTJAR_SITE_ID = 5011428
export const HOTJAR_VERSION = 6
