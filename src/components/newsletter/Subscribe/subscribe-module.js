import React, { useEffect, useRef, useState } from 'react'

import Button from 'components/button'
import ButtonSubmit from 'components/newsletter/Subscribe/button-submit'
import subscribeCookies from 'js/newsletter/cookie-utils'
import useSubmitSubscription from 'js/newsletter/hooks/use-submit-subscription'
import { NEWSLETTER_PATH } from 'src/constants'

import 'components/newsletter/Subscribe/scss/subscribe-module.scss'

const SHOW_BANNER_TIMEOUT = 3500

function SubscribeModule({ variant = 'product' }) {
  const inputRef = useRef()

  const { isCookieNotSet, isSessionCookieNotSet, setSubscribeCookieSession } =
    subscribeCookies(variant)

  const [show, setShow] = useState(isCookieNotSet && isSessionCookieNotSet)
  const [disabled, setDisabled] = useState(true)
  const [email, setEmail] = useState('')

  const { formMessage, submitted, handleSubmit, setFormState } = useSubmitSubscription(
    variant,
    email
  )

  // Submit on 'Enter'.
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmitClicked()
  }

  const handleInputChanged = (e) => {
    setDisabled(false)
    setEmail(e.target.value)
    setFormState('initial')
  }

  const handleSubmitClicked = () => {
    setDisabled(true)
    handleSubmit()
  }

  // Do not show if cookie banner is present.
  // A timeout of 3500ms gives the cookie banner time to appear
  // while also being less than the 4s mark at which the notice
  // animates in (delay set on css animation prop).
  useEffect(() => {
    const showBannerTimeout = setTimeout(() => {
      if (
        typeof document !== 'undefined' &&
        document.getElementsByClassName('x-cookies-banner').length === 0
      ) {
        setSubscribeCookieSession()
      } else {
        setShow(false)
      }
    }, SHOW_BANNER_TIMEOUT)

    return () => clearTimeout(showBannerTimeout)
  }, [])

  return (
    <div className="x__subscribe-module">
      <span className="x__title">
        {show && submitted ? 'One last step!' : 'Subscribe to the Newsletter!'}
      </span>
      <span className="x__description">
        {show && submitted
          ? 'Look for our email and click the confirmation button to finish subscribing.'
          : 'Get the latest Exodus news and product updates delivered straight to your inbox.'}
      </span>

      <div className="x__subscribe-module__content">
        {show ? (
          submitted ? null : (
            <>
              <div className="x__input">
                <input
                  ref={inputRef}
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  onChange={handleInputChanged}
                  onKeyDown={handleInputKeyDown}
                />
                <ButtonSubmit disabled={disabled} onClick={handleSubmitClicked} />
              </div>
              <span className="x__form-message">{formMessage}</span>
            </>
          )
        ) : (
          <Button to={NEWSLETTER_PATH} copy="Subscribe" size="largest" />
        )}
      </div>

      {show && submitted ? null : (
        <span className="x__disclaimer">
          We'll only use your email to send information about Exodus.{' '}
          <span className="x-break-sm" />
          You can unsubscribe at any time.
        </span>
      )}
    </div>
  )
}

export default SubscribeModule
