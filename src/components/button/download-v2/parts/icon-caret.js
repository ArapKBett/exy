import React from 'react'

function IconCaretSvg({ color = 'currentColor', size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <g clipPath="url(#c_0)">
        <path
          d="M11.8782 15.6011C12.0474 15.6011 12.2165 15.5334 12.3315 15.4049L17.5671 10.0408C17.6821 9.92578 17.7497 9.77697 17.7497 9.60786C17.7497 9.25611 17.4859 8.98553 17.1342 8.98553C16.9651 8.98553 16.8095 9.05318 16.6945 9.16141L11.513 14.4579H12.2368L7.05525 9.16141C6.94702 9.05318 6.79143 8.98553 6.61556 8.98553C6.26381 8.98553 6 9.25611 6 9.60786C6 9.77697 6.06764 9.92578 6.18264 10.0475L11.4183 15.4049C11.5468 15.5334 11.7024 15.6011 11.8782 15.6011Z"
          fill={color}
          fillOpacity={0.85}
        />
      </g>
      <defs>
        <clipPath id="c_0">
          <rect width={12} height={7.20407} fill={color} transform="translate(6 8.39795)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default IconCaretSvg
