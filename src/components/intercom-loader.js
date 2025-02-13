import Intercom from '@intercom/messenger-js-sdk'

import { INTERCOM_MESSENGER_ID } from 'src/constants'

export default function IntercomLoader({
  intercomSettings = {},
  showNewMessage = false,
  prepopulatedMessage = '',
}) {
  Intercom({
    app_id: INTERCOM_MESSENGER_ID,
    ...intercomSettings,
  })
  if (showNewMessage) {
    window.Intercom('showNewMessage', prepopulatedMessage)
  }
  return null
}
