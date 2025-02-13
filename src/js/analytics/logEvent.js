import ReactGA from 'react-ga'

// ------------------------
// Google event structure:
// - event category --- (c)
//    - event action -- (a)
//      - event label - (l)
// ------------------------

// Exclussion arrays:
const cExclussions = ['MarCom']
const pExclussions = ['iOS', 'Android']
const tExclussions = ['Page']

// Helpers:
const splitLabel = (str) => {
  if (!str) return null

  const splitted = str.split('_')
  const [platform, type] = splitted

  return [platform, type]
}

// Universal Google Analytics:
export const logUAEvent = (args) => {
  const [category, action, label] = args
  ReactGA.event({ category, action, label })
}

// Google Analytics 4:
/* eslint-disable no-undef */
export const logGA4Event = (args, page) => {
  if (!window.gtag || !args) return null

  const [c, a, l] = args
  gtag('event', c, { [a]: l })

  if (cExclussions.includes(c)) return null

  if (page) {
    gtag('event', a, { [l]: `${l.replaceAll('_', '')}_${page}` })
  } else {
    gtag('event', a, { [l]: l })
  }

  const [p, t] = splitLabel(l)
  if (typeof t !== 'undefined') {
    if (tExclussions.includes(t)) return null
    gtag('event', p, { [t]: t })
  } else {
    if (pExclussions.includes(p)) return null
    gtag('event', p)
  }
}

export default ({ ua, ga }, page = null) => {
  !!ua && logUAEvent(ua)
  !!ga && logGA4Event(ga, page)
}
