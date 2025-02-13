import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import emptyIcon from 'components/assets/shared/img/empty-asset-icon.svg'

import 'components/assets/shared/scss/AssetIcon.scss'

// main component.
const AssetIcon = ({
  icon,
  network,
  networkIcon,
  name,
  alt = null,
  ticker,
  isCombined,
  size = 'normal',
  showTooltip = false,
  style,
}) => {
  const baseClassName = 'x__asset-icon'
  const iconSrc = icon || emptyIcon
  const iconAltCopy = alt || `${name} (${ticker})${network ? ` ${network} network` : ''}`
  const networkAltCopy = `${network} network`
  const classNameBySize = (str = '') => {
    return `${baseClassName}${str} ${baseClassName}--${size}${str}`
  }

  const element = (
    <i className={`${baseClassName}__wrapper`} style={style}>
      <img className={classNameBySize()} src={iconSrc} alt={iconAltCopy} />

      {!!networkIcon && !isCombined && (
        <img className={classNameBySize('__network-icon')} src={networkIcon} alt={networkAltCopy} />
      )}

      {isCombined && (
        <>
          <img className={classNameBySize('--drop1')} src={iconSrc} alt={`${iconAltCopy}--drop1`} />
          <img className={classNameBySize('--drop2')} src={iconSrc} alt={`${iconAltCopy}--drop2`} />
        </>
      )}
    </i>
  )

  if (!showTooltip) return element

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id={`tooltip-${ticker}`}>{iconAltCopy}</Tooltip>}
    >
      {element}
    </OverlayTrigger>
  )
}

export default AssetIcon
