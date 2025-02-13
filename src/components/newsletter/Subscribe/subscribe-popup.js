import classNames from 'classnames'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useState, useEffect, useRef } from 'react'

import Button from 'components/button'
import CloseIcon from 'components/newsletter/Subscribe/button-close'
import IconSubmitted from 'components/newsletter/Subscribe/icon-submitted'
import subscribeCookies from 'js/newsletter/cookie-utils'
import useSubmitSubscription from 'js/newsletter/hooks/use-submit-subscription'
import { getCookie } from 'js/utils/cookies'
import useDimensions from 'js/utils/hooks/useDimensions'

import 'components/newsletter/Subscribe/scss/subscribe-popup.scss'

const SHOW_BANNER_TIMEOUT = 3500

const SubscribePopup = ({ variant = 'product', withDownloadBanner = false }) => {
  const inputRef = useRef()

  const { isMobile } = useDimensions()

  const {
    isCookieNotSet,
    isSessionCookieNotSet,
    setSubscribeCloseCookie,
    setSubscribeCookie,
    setSubscribeCookieSession,
  } = subscribeCookies(variant)

  const [show, setShow] = useState(isCookieNotSet && isSessionCookieNotSet)
  const [closed, setClosed] = useState(false)
  const [doneAnimating, setDoneAnimating] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [email, setEmail] = useState('')

  const { formMessage, submitted, handleSubmit, setFormState } = useSubmitSubscription(
    variant,
    email
  )

  const [downloadBanner, setDownloadBanner] = useState(
    withDownloadBanner && getCookie('ex_download_session') !== `1`
  )

  const background = useStaticQuery(graphql`
      query {
        image: file(relativePath: { regex: "/^subscribe\/img\/subscribe-pop-up-background\\.jpg$/" }) {
          childImageSharp { gatsbyImageData(width: 1056, placeholder: BLURRED) }
        }
      }
    `)

  // If closing without having subscribed.
  const handleClose = () => {
    setClosed(true)
    setFormState('initial')
    submitted ? setSubscribeCookie() : setSubscribeCloseCookie()
  }

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

    const showAnimationTimeout = setTimeout(() => {
      setDoneAnimating(true)
    }, SHOW_BANNER_TIMEOUT + 500)

    return () => {
      clearTimeout(showBannerTimeout)
      clearTimeout(showAnimationTimeout)
    }
  }, [])

  // Force input autofocus.
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  // Update position if download banner is closed.
  useEffect(() => {
    if (!withDownloadBanner) return

    const checkCookie = () => {
      setDownloadBanner(withDownloadBanner && getCookie('ex_download_session') !== `1`)
    }
    checkCookie()
    const interval = setInterval(checkCookie, 1000)

    return () => clearInterval(interval)
  }, [withDownloadBanner])

  if (!show) return null

  return (
    <>
      {isMobile ? (
        <div
          className={classNames('x__subscribe-popup__overlay', {
            'x__subscribe-popup__overlay--closed': closed,
          })}
        />
      ) : null}
      <div
        className={classNames('x__subscribe-popup', {
          'x__subscribe-popup--done-animating': doneAnimating,
          'x__subscribe-popup--closed': closed,
          'x__subscribe-popup--with-banner': downloadBanner,
        })}
      >
        {isMobile ? null : (
          <GatsbyImage
            image={getImage(background.image)}
            className="x__subscribe-popup__background"
            alt="Subscribe to the Exodus Newsletter background"
            loading="eager"
          />
        )}
        <CloseIcon onClick={handleClose} />
        <div className="x__subscribe-popup__content">
          <span className="x__title">{submitted ? 'One last step!' : 'Stay in the loop!'}</span>
          <span className="x__description">
            {submitted
              ? variant === 'investor'
                ? 'Look for our email and click the confirmation button to finish subscribing to the Exodus Investor Newsletter.'
                : 'Look for our email and click the confirmation button to finish subscribing to the Exodus Newsletter.'
              : variant === 'investor'
              ? 'Subscribe to the Exodus Investor Newsletter and stay informed about Company financials and investor communications.'
              : 'Subscribe to the Exodus Newsletter to get the latest news and product updates delivered straight to your inbox.'}
          </span>
          {submitted ? (
            <IconSubmitted />
          ) : (
            <>
              <label htmlFor="email" className="x__input">
                <input
                  ref={inputRef}
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  autoFocus
                  onChange={handleInputChanged}
                  onKeyDown={handleInputKeyDown}
                />
                <span>{formMessage}</span>
              </label>
              <Button
                copy="Submit"
                size="largest"
                disabled={disabled}
                onClick={handleSubmitClicked}
              />
            </>
          )}
        </div>
        {submitted ? null : (
          <span className="x__disclaimer">
            We'll only use your email to send information about Exodus.{' '}
            <span className="x-break-lg" />
            You can unsubscribe at any time.
          </span>
        )}
      </div>
    </>
  )
}

export default SubscribePopup
