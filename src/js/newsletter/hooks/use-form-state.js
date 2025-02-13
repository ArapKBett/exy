import { useEffect, useState } from 'react'

export const NEWSLETTER_FORM_MESSAGES = {
  initial: '',
  loading: 'Submitting...',
  invalid: 'A valid email address must be provided.',
  ratelimit: 'Too many requests. Please try again later.',
  error: 'Something went wrong. Please try again.',
}

function useFormState() {
  const [formState, setFormState] = useState('initial')
  const [formMessage, setFormMessage] = useState(NEWSLETTER_FORM_MESSAGES.initial)

  useEffect(() => {
    if (!Object.keys(NEWSLETTER_FORM_MESSAGES).includes(formState)) {
      setFormState('initial')
    }
    setFormMessage(NEWSLETTER_FORM_MESSAGES[formState])
  }, [formState])

  return {
    formMessage,
    formState,
    setFormState,
  }
}

export default useFormState
