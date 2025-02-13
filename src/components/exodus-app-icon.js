import React from 'react'

function ExodusAppIconSvg({ size = 40 }) {
  return (
    <svg width={size} height={size} fill="none">
      <g clipPath="url(#clip0_271_5083)">
        <path fill="url(#paint0_linear_271_5083)" d="M0 0h40v40H0z" />
        <path
          fill="url(#paint1_linear_271_5083)"
          d="M33.508 13.963L21.864 6.328v4.269l7.47 4.854-.88 2.78h-6.59v3.537h6.59l.88 2.78-7.47 4.855v4.269l11.644-7.61-1.904-6.05 1.904-6.05z"
        />
        <path
          fill="url(#paint2_linear_271_5083)"
          d="M11.733 21.768h6.566v-3.537h-6.59l-.855-2.78 7.445-4.854v-4.27L6.655 13.964l1.904 6.049-1.904 6.05 11.669 7.61v-4.269l-7.47-4.854.879-2.78z"
        />
        <mask
          id="a"
          style={{ maskType: 'alpha' }}
          width={28}
          height={28}
          x={6}
          y={6}
          maskUnits="userSpaceOnUse"
        >
          <path
            fill="url(#paint3_linear_271_5083)"
            d="M33.508 13.963L21.864 6.328v4.269l7.47 4.854-.88 2.78h-6.59v3.537h6.59l.88 2.78-7.47 4.855v4.269l11.644-7.61-1.904-6.05 1.904-6.05z"
          />
          <path
            fill="url(#paint4_linear_271_5083)"
            d="M11.733 21.768h6.566v-3.537h-6.59l-.855-2.78 7.445-4.854v-4.27L6.655 13.964l1.904 6.049-1.904 6.05 11.669 7.61v-4.269l-7.47-4.854.879-2.78z"
          />
        </mask>
        <g mask="url(#a)">
          <path fill="url(#paint5_linear_271_5083)" d="M6.67 6.328h26.66v27.344H6.67z" />
        </g>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_271_5083"
          x1={0}
          x2={40}
          y1={40}
          y2={0}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0A0B1A" />
          <stop offset={1} stopColor="#333649" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_271_5083"
          x1={29.741}
          x2={21.941}
          y1={35.551}
          y2={3.325}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0B46F9" />
          <stop offset={1} stopColor="#BBFBE0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_271_5083"
          x1={29.741}
          x2={21.941}
          y1={35.551}
          y2={3.325}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0B46F9" />
          <stop offset={1} stopColor="#BBFBE0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_271_5083"
          x1={29.741}
          x2={21.941}
          y1={35.551}
          y2={3.325}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0B46F9" />
          <stop offset={1} stopColor="#BBFBE0" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_271_5083"
          x1={29.741}
          x2={21.941}
          y1={35.551}
          y2={3.325}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0B46F9" />
          <stop offset={1} stopColor="#BBFBE0" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_271_5083"
          x1={8.379}
          x2={21.88}
          y1={12.48}
          y2={22.563}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.12} stopColor="#8952FF" stopOpacity={0.87} />
          <stop offset={1} stopColor="#DABDFF" stopOpacity={0} />
        </linearGradient>
        <clipPath id="clip0_271_5083">
          <rect width={40} height={40} fill="#fff" rx={11.111} />
        </clipPath>
      </defs>
    </svg>
  )
}

export default ExodusAppIconSvg
