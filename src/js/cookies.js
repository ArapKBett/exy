import { DOMAIN, isDev } from 'src/constants'

// NOTE: functions check whether document is defined to avoid build failures

export const getCookie = (name) => {
  if (typeof document === 'undefined') return

  const cookies = {}

  decodeURIComponent(document.cookie)
    .split(';')
    .forEach((str) => {
      const [name, value] = str.trim().split('=')
      cookies[name] = value
    })

  return cookies[name]
}

export const setCookie = ({ name, value, daysToPersist, currentSubdomainOnly }) => {
  if (typeof document === 'undefined') return

  if (daysToPersist === 'forever') daysToPersist = 1000
  const expiryDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * (daysToPersist || 0)).toUTCString()
  const expires = daysToPersist ? `;expires=${expiryDate}` : ''

  // share across subdomains (support.exodus.com) unless currentSubdomainOnly
  const domain = !currentSubdomainOnly && !isDev ? `;domain=${DOMAIN}` : ''

  document.cookie = `${name}=${value};path=/${expires}${domain}`
}

export const deleteCookie = ({ name }) => {
  if (typeof document === 'undefined') return

  // set the expires parameter to a passed date
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * -1000).toUTCString()

  document.cookie = `${name}=;expires=${expires};path=/`
}
