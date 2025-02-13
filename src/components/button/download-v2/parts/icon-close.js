import React from 'react'

function IconCloseSvg({ color = '#FFFFFF', size = 10 }) {
  return (
    <svg width={size} height={size} fill="none">
      <g fill={color} opacity={0.3}>
        <rect
          width={11.932}
          height={0.795}
          x={0.719}
          y={0.156}
          rx={0.398}
          transform="rotate(45 .719 .156)"
        />
        <rect
          width={11.932}
          height={0.795}
          rx={0.398}
          transform="scale(-1 1) rotate(45 -4.486 -10.295)"
        />
      </g>
    </svg>
  )
}

export default IconCloseSvg
