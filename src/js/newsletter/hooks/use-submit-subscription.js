import EmailValidator from 'email-validator'
import { useCallback, useState } from 'react'

import subscribeCookies from 'js/newsletter/cookie-utils'
import useFormState from 'js/newsletter/hooks/use-form-state'
import { HELPERS_URL } from 'src/constants'

function useSubmitSubscription(variant, email) {
  const [submitted, setSubmitted] = useState(false)

  const { formMessage, formState, setFormState } = useFormState()

  const { setSubscribeCookie, setSubscribeCookieSession } = subscribeCookies(variant)

  const isInvestorNewsletter = variant === 'investor'

  let url = `${HELPERS_URL}/users/subscription`
  if (isInvestorNewsletter) url = `${HELPERS_URL}/users/investors-subscription`

  // Fix the origin object. Left over in support-lambda and customer.io.
  let origin = { website: true, blog: true }
  if (isInvestorNewsletter) origin = { shares: true }

  const handleSubmit = useCallback(() => {
    // Prevent multiple submissions
    if (formState !== 'initial' || submitted) return

    if (!EmailValidator.validate(email)) {
      setFormState('invalid')
      return
    }

    setFormState('loading')

    fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, origin }),
    })
      .then(async (response) => {
        const success = response.status === 200
        const invalid = response.status === 400
        const ratelimit = response.status === 429

        if (success) {
          setSubmitted(true)
          setSubscribeCookie()
          setSubscribeCookieSession()
        } else if (invalid) {
          setFormState('invalid')
        } else if (ratelimit) {
          setFormState('ratelimit')
        } else {
          setFormState('error')
        }
      })
      .catch((err) => {
        console.log(err)
        setFormState('error')
      })
  }, [
    email,
    formState,
    submitted,
    url,
    origin,
    setSubscribeCookie,
    setSubscribeCookieSession,
    setFormState,
    setSubmitted,
  ])

  return { formMessage, formState, submitted, handleSubmit, setFormState }
}

export default useSubmitSubscription
