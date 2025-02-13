import React from 'react'

import 'components/newsletter/Subscribe/scss/button-close.scss'

function ButtonClose({ onClick }) {
  const ariaTitle = 'Close'
  const ariaLabel = 'Click to close popup'

  return (
    <button
      className="x__subscribe-popup__close"
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
    >
      <svg viewBox="0 0 13 13" aria-label={ariaTitle}>
        <title>{ariaTitle}</title>
        <desc>{ariaLabel}</desc>
        <path d="M0.538916 1.13427C0.200551 1.47264 0.20746 2.03197 0.538916 2.36343L5.00667 6.83118L0.538944 11.2989C0.207453 11.6304 0.200536 12.1897 0.538901 12.5281C0.877266 12.8665 1.44351 12.8665 1.775 12.535L6.24273 8.06724L10.7035 12.5281C11.035 12.8595 11.5944 12.8665 11.9327 12.5281C12.2711 12.1897 12.2711 11.6235 11.9396 11.292L7.47879 6.83118L11.9396 2.37033C12.2711 2.03888 12.2711 1.47264 11.9327 1.13427C11.5944 0.79591 11.035 0.802819 10.7036 1.13428L6.24273 5.59512L1.77497 1.12737C1.44352 0.795911 0.877281 0.79591 0.538916 1.13427Z" />
      </svg>
    </button>
  )
}

export default ButtonClose
