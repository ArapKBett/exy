import React from 'react'

import './plug-to-center-menu.scss'

/**
 * Empty element to keep the menu centered even when `SocialNetworks` and/or `DownloadButton`
 * components are hidden. It allows to keep flex layout for navbar and does not overcomplicate alignment
 * of the menu in these cases.
 */
function PlugToCenterMenu() {
  return <span className="x__plug-to-center-menu" />
}

export default PlugToCenterMenu
