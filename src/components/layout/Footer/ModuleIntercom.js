import React, { createContext } from 'react'

import IntercomLoader from 'src/components/intercom-loader'

export const ChatContext = createContext()

export default function ModuleIntercom({ intercomSettings, showNewMessage, prepopulatedMessage }) {
  return (
    <IntercomLoader
      intercomSettings={intercomSettings}
      showNewMessage={showNewMessage}
      prepopulatedMessage={prepopulatedMessage}
    />
  )
}
