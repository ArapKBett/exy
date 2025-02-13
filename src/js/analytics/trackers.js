import { DOWNLOAD_LINK_OS_KEYS, DOWNLOAD_PLATFORMS } from 'src/constants'

/* eslint-disable no-unused-vars */
const {
  web3: [web3UA, web3GA],
  ios: [iosUA, iosGA],
  android: [androidUA, androidGA],
  win: [winUA, winGA],
  mac: [macUA, macGA],
  macMs: [macMsUA, macMsGA],
  lin: [linUA, linGA],
  linZip: [linZipUA, linZipGA],
} = DOWNLOAD_LINK_OS_KEYS

const {
  desktop: [desktopGA, desktopUA],
  mobile: [mobileGA, mobileUA],
  web3: [extensionGA, extensionUA],
} = DOWNLOAD_PLATFORMS
/* eslint-enable no-unused-vars */

const langStr = (lang = '', prefix = '') => {
  if (!lang) return ''
  if (prefix) return `${prefix}${lang.toUpperCase()}`
  return lang.toUpperCase()
}

/* Downloads: */

// Web3WalletPage: Web3
export const WEB3WALLETPAGE_DOWNLOAD_WEB3 = {
  ua: ['Web3WalletPage', web3UA, 'web3-wallet-page'],
  ga: ['Web3WalletPage', web3GA, 'Web3WalletPage'],
}

// Web3WalletPage: Mobile
export const WEB3WALLETPAGE_DOWNLOAD_MOBILE = {
  ua: ['Web3WalletPage', mobileUA, 'web3-wallet-page'],
  ga: ['Web3WalletPage', mobileGA, 'Web3WalletPage'],
}

export const DOWNLOAD_WEB3 = (lang = '') => {
  return {
    ua: [
      `Downloads${langStr(lang, '-')}`,
      `${web3UA}${langStr(lang, '-')}`,
      `${extensionUA}${langStr(lang, '-')}`,
    ],
    ga: [
      `Downloads${langStr(lang, '-')}`,
      `${web3GA}${langStr(lang, '-')}`,
      `${extensionGA}${langStr(lang, '-')}`,
    ],
  }
}

export const DOWNLOAD_EXTENSION = (lang = '') => {
  return {
    ua: [
      `Downloads${langStr(lang, '-')}`,
      `${extensionUA}${langStr(lang, '-')}`,
      `download-page${langStr(lang, '-')}`,
    ],
    ga: [
      `Downloads${langStr(lang, '_')}`,
      `${web3GA}${langStr(lang, '_')}`,
      `Download_Page${langStr(lang, '_')}`,
    ],
  }
}

// Mobile
export const DOWNLOAD_IOS = (lang = '') => {
  return {
    ua: [
      `Downloads${langStr(lang, '-')}`,
      `${mobileUA}${langStr(lang, '-')}`,
      `${iosUA}${langStr(lang, '-')}`,
    ],
    ga: [
      `Downloads${langStr(lang, '_')}`,
      `${mobileGA}${langStr(lang, '_')}`,
      `${iosGA}${langStr(lang)}`,
    ],
  }
}

export const DOWNLOAD_ANDROID = (lang = '') => {
  return {
    ua: [
      `Downloads${langStr(lang, '-')}`,
      `${mobileUA}${langStr(lang, '-')}`,
      `${androidUA}${langStr(lang, '-')}`,
    ],
    ga: [
      `Downloads${langStr(lang, '_')}`,
      `${mobileGA}${langStr(lang, '_')}`,
      `${androidGA}${langStr(lang)}`,
    ],
  }
}

// Desktop
export const DOWNLOAD_MACOS_MS_PAGE = (lang = '') => {
  return {
    ua: [
      `Downloads${langStr(lang, '-')}`,
      `${desktopUA}${langStr(lang, '-')}`,
      `${macMsUA}${langStr(lang, '-')}`,
    ],
    ga: [
      `Downloads${langStr(lang, '_')}`,
      `${desktopGA}${langStr(lang, '_')}`,
      `${macMsGA}${langStr(lang)}`,
    ],
  }
}

export const DOWNLOAD_LINUX_ZIP = (lang = '') => {
  return {
    ua: [
      `Downloads${langStr(lang, '-')}`,
      `${desktopUA}${langStr(lang, '-')}`,
      `${linZipUA}${langStr(lang, '-')}`,
    ],
    ga: [
      `Downloads${langStr(lang, '_')}`,
      `${desktopGA}${langStr(lang, '_')}`,
      `${linZipGA}${langStr(lang)}`,
    ],
  }
}

export const DOWNLOAD_LINUX_DEB = (lang = '') => {
  return {
    ua: [
      `Downloads${langStr(lang, '-')}`,
      `${desktopUA}${langStr(lang, '-')}`,
      `${linUA}${langStr(lang, '-')}`,
    ],
    ga: [
      `Downloads${langStr(lang, '_')}`,
      `${desktopGA}${langStr(lang, '_')}`,
      `${linGA}${langStr(lang)}`,
    ],
  }
}

export const DOWNLOAD_MACOS_MS = (lang = '') => {
  return {
    ua: [
      `Downloads${langStr(lang, '-')}`,
      `${desktopUA}${langStr(lang, '-')}`,
      `${macMsUA}${langStr(lang, '-')}`,
    ],
    ga: [
      `Downloads${langStr(lang, '_')}`,
      `${desktopGA}${langStr(lang, '_')}`,
      `${macMsGA}${langStr(lang)}`,
    ],
  }
}

export const DOWNLOAD_MACOS_INTEL = (lang = '') => {
  return {
    ua: [
      `Downloads${langStr(lang, '-')}`,
      `${desktopUA}${langStr(lang, '-')}`,
      `${macUA}${langStr(lang, '-')}`,
    ],
    ga: [
      `Downloads${langStr(lang, '_')}`,
      `${desktopGA}${langStr(lang, '_')}`,
      `${macGA}${langStr(lang)}`,
    ],
  }
}

export const DOWNLOAD_WINDOWS = (lang = '') => {
  return {
    ua: [
      `Downloads${langStr(lang, '-')}`,
      `${desktopUA}${langStr(lang, '-')}`,
      `${winUA}${langStr(lang, '-')}`,
    ],
    ga: [
      `Downloads${langStr(lang, '_')}`,
      `${desktopGA}${langStr(lang, '_')}`,
      `${winGA}${langStr(lang)}`,
    ],
  }
}

// AssetPage: Web3
export const ASSETPAGE_DOWNLOAD_WEB3 = (page) => {
  return {
    ua: ['AssetPage_Downloads', page, web3UA],
    ga: ['AssetPage_Downloads', page, web3GA],
  }
}

// AssetPage: Mobile
export const ASSETPAGE_DOWNLOAD_MOBILE = (page) => {
  return {
    ua: ['AssetPage_Downloads', page, mobileUA],
    ga: ['AssetPage_Downloads', page, mobileGA],
  }
}

// AssetPage: Desktop
export const ASSETPAGE_DOWNLOAD_DESKTOP = (page) => {
  return {
    ua: ['AssetPage_Downloads', page, desktopUA],
    ga: ['AssetPage_Downloads', page, desktopGA],
  }
}

/* Marcom: */
export const MARCOM_SUBSCRIBE_CARDANO_PRE_SEED_PAGE = {
  ga: ['Cardano_Pre_Seed', 'Subscribe', 'Get_Access'],
}

export const MARCOM_SUBSCRIBE_CS_MEMBERSHIP_PAGE = {
  ga: ['CS_Membership', 'Subscribe', 'Sign_Up'],
}

export const MARCOM_SUBSCRIBE_NEWSLETTER_PAGE = {
  ga: ['Newsletter_Subscription', 'Subscribe', 'Newsletter'],
}

export const MARCOM_CRYPTO_VOICE_BANNER = {
  ga: ['StandWithCrypto_Banner', 'HomePage', 'Learn_More'],
}

export const MARCOM_NYSE_AMERICAN_BANNER = {
  ga: ['NYSE_American_Banner', 'HomePage', 'Learn_More'],
}
