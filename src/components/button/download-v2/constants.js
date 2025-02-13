import { DOWNLOAD_LINK_OS_KEYS, DOWNLOAD_PLATFORMS } from 'src/constants'

function keyExtractor(object) {
  if (!object) return {}

  return Object.fromEntries(Object.entries(object).map(([key, values]) => [key, values[0]]))
}

const extractedOs = keyExtractor(DOWNLOAD_LINK_OS_KEYS)
const { android, ios, lin, linZip, mac, macMs, web3, win } = extractedOs
export const OS_KEYS = { ...extractedOs }

const extractedPlatforms = keyExtractor(DOWNLOAD_PLATFORMS)
export const PLATFORMS = { ...extractedPlatforms, extension: extractedPlatforms.web3 }

export const LINK_OS_LABELS = {
  [android]: 'Download on Google Play',
  [ios]: 'Download on the App Store',
  [lin]: 'Download for Linux (.deb)',
  [linZip]: 'Download for Linux (.zip)',
  [mac]: 'Download for Mac (Intel)',
  [macMs]: 'Download for Mac (Apple Silicon)',
  [web3]: 'Download on Chrome Web Store',
  [win]: 'Download for Windows (64-bit)',
}

export const CONDENSED_LINK_OS_LABELS = {
  [android]: 'Google Play',
  [ios]: 'App Store',
  [lin]: 'Linux (.deb)',
  [linZip]: 'Linux (.zip)',
  [mac]: 'Mac (Intel)',
  [macMs]: 'Mac (Apple Silicon)',
  [web3]: 'Chrome Web Store',
  [win]: 'Windows (64-bit)',
}

export const BUTTON_LABELS = {
  linux: 'Download Exodus for Linux',
  macintosh: 'Download Exodus for Mac',
  windows: 'Download Exodus for Windows',
}
