import React from 'react'

function IconStarSvg({ color = 'currentColor', size = 9 }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 9 9">
      <path
        fill="url(#gradient)"
        d="M4.428.337a.08.08 0 01.144 0L5.73 2.916a.08.08 0 00.064.046l2.81.304a.08.08 0 01.045.138L6.554 5.3a.08.08 0 00-.025.075l.58 2.767a.08.08 0 01-.117.085L4.539 6.822a.08.08 0 00-.078 0L2.008 8.228a.08.08 0 01-.117-.085l.58-2.767a.08.08 0 00-.025-.075L.351 3.404a.08.08 0 01.045-.138l2.81-.304a.08.08 0 00.064-.046L4.428.336z"
      />
      <defs>
        <linearGradient
          id="gradient"
          x1={1.607}
          x2={9}
          y1={1.461}
          y2={9.176}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} stopOpacity={0.3} />
          <stop offset={1} stopColor={color} stopOpacity={0.1} />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default IconStarSvg
