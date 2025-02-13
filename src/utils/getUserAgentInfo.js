const getUserAgentInfo = () => {
  if (typeof window === 'undefined') return {}

  const isIOS = /(iphone|ipad|ipod)/i.test(navigator.userAgent)
  const isAndroid = /Android/i.test(navigator.userAgent)
  const isChrome = /chrome/i.test(navigator.userAgent)
  const isSafari = !isChrome && /safari/i.test(navigator.userAgent)

  return { isIOS, isAndroid, isChrome, isSafari }
}

export default getUserAgentInfo
