import React from 'react'

import 'components/newsletter/Subscribe/scss/button-submit.scss'
import classNames from 'classnames'

function ButtonSubmit({ disabled, onClick }) {
  const ariaTitle = 'Submit'
  const ariaLabel = 'Click to subscribe'

  return (
    <button
      className={classNames('x__subscribe-module__submit', {
        'x__subscribe-module__submit--disabled': disabled,
      })}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
    >
      <svg viewBox="0 0 23 13" aria-label={ariaTitle}>
        <title>{ariaTitle}</title>
        <desc>{ariaLabel}</desc>
        <path d="M22.8794 6.36396L16.5154 0L15.1012 1.41421L19.187 5.5H0.879395V7.5H18.9149L15.1012 11.3137L16.5154 12.7279L22.8794 6.36396Z" />
      </svg>
    </button>
  )
}

export default ButtonSubmit
