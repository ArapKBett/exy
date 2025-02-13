import { Link } from 'gatsby'
import React from 'react'

import './exodus-responsive-logo.scss'
import classNames from 'classnames'

function Logo() {
  return (
    <svg fill="none" viewBox="0 0 156 32">
      <title>Exodus</title>
      <g id="exodus-logomark">
        <path
          fill="url(#gradient_1)"
          d="M31.808 8.935L18.181 0v4.996l8.742 5.68-1.029 3.254h-7.713v4.14h7.713l1.029 3.254-8.742 5.68V32l13.627-8.906-2.228-7.08 2.228-7.08z"
        />
        <path
          fill="url(#gradient_2)"
          d="M6.325 18.07h7.685v-4.14H6.296l-1-3.254 8.714-5.68V0L.383 8.935l2.228 7.08-2.228 7.079L14.039 32v-4.995l-8.742-5.681 1.028-3.254z"
        />
        <mask
          id="mask0_536_8492"
          style={{ maskType: 'alpha' }}
          width={32}
          height={32}
          x={0}
          y={0}
          maskUnits="userSpaceOnUse"
        >
          <path
            fill="url(#gradient_3)"
            d="M31.808 8.935L18.181 0v4.996l8.742 5.68-1.029 3.254h-7.713v4.14h7.713l1.029 3.254-8.742 5.68V32l13.627-8.906-2.228-7.08 2.228-7.08z"
          />
          <path
            fill="url(#gradient_4)"
            d="M6.325 18.07h7.685v-4.14H6.296l-1-3.254 8.714-5.68V0L.383 8.935l2.228 7.08-2.228 7.079L14.039 32v-4.995l-8.742-5.681 1.028-3.254z"
          />
        </mask>
        <g mask="url(#mask0_536_8492)">
          <path fill="url(#gradient_5)" d="M0.4 0H31.599999999999998V32H0.4z" />
        </g>
      </g>
      <g id="exodus-logotype">
        <path
          fill="#fff"
          d="M58.92 8.8v2.797H46.029v2.863h10.955v2.798H46.028v3.144h12.893V23.2h-16.2V8.8h16.2zM60.75 23.2l7.407-7.287L60.96 8.8h4.553l5.078 5.14L75.46 8.8h4.26l-7.177 7.113L79.95 23.2h-4.595l-4.764-5.292-5.434 5.292H60.75z"
        />
        <path
          fill="#fff"
          d="M88.832 8.8c6.001 0 9.61 3.005 9.61 7.2s-3.609 7.2-9.61 7.2c-6.001 0-9.59-3.005-9.59-7.2s3.589-7.2 9.59-7.2zm0 2.692c-3.61 0-6.27 1.816-6.27 4.508s2.66 4.508 6.27 4.508c3.63 0 6.29-1.816 6.29-4.508s-2.66-4.508-6.29-4.508zM110.404 8.8c4.807 0 7.703 2.667 7.703 7.178 0 4.554-2.875 7.222-7.661 7.222h-9.739V8.8h9.697zm4.303 7.178c0-2.82-1.679-4.38-4.723-4.38h-5.982v8.804h5.982c3.044 0 4.723-1.583 4.723-4.424zM129.005 23.2c-5.061 0-8.9-2.297-8.9-6.53V8.8h3.312v7.55c0 2.617 2.72 3.83 5.588 3.83 2.89 0 5.61-1.192 5.61-3.83V8.8h3.29v7.87c0 4.233-3.817 6.53-8.9 6.53zM147.174 23.2c-2.719 0-5.651-.501-7.733-1.44l1.084-2.672c1.869.856 4.44 1.399 6.755 1.399 2.656 0 5.141-.564 5.141-1.565 0-.73-.786-1.044-2.422-1.294l-4.631-.501c-3.569-.48-5.311-1.711-5.311-3.882 0-2.796 2.953-4.445 7.287-4.445 2.613 0 6.203.48 8.051 1.315l-1.083 2.546c-1.827-.752-4.929-1.127-7.117-1.127-2.252 0-3.739.521-3.739 1.481 0 .668.744 1.002 2.656 1.274l4.503.5c3.442.48 5.226 1.65 5.226 3.924 0 2.88-3.781 4.487-8.667 4.487z"
        />
      </g>
      <defs>
        <linearGradient
          id="gradient_1"
          x1={27.4}
          x2={18.272}
          y1={34.2}
          y2={-3.514}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0B46F9" />
          <stop offset="1" stopColor="#BBFBE0" />
        </linearGradient>
        <linearGradient
          id="gradient_2"
          x1={27.4}
          x2={18.272}
          y1={34.2}
          y2={-3.514}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0B46F9" />
          <stop offset="1" stopColor="#BBFBE0" />
        </linearGradient>
        <linearGradient
          id="gradient_3"
          x1={27.4}
          x2={18.272}
          y1={34.2}
          y2={-3.514}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0B46F9" />
          <stop offset="1" stopColor="#BBFBE0" />
        </linearGradient>
        <linearGradient
          id="gradient_4"
          x1={27.4}
          x2={18.272}
          y1={34.2}
          y2={-3.514}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0B46F9" />
          <stop offset="1" stopColor="#BBFBE0" />
        </linearGradient>
        <linearGradient
          id="gradient_5"
          x1={2.4}
          x2={18.2}
          y1={7.2}
          y2={19}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.12} stopColor="#8952FF" stopOpacity={0.87} />
          <stop offset={1} stopColor="#DABDFF" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  )
}

function ExodusLogo({ hideLogotype, showLogotype, isMenuOpen = false, href = '/' }) {
  return (
    <Link
      to={href}
      className={classNames('x__exodus-logo', {
        'x__exodus-logo--hide-logotype': hideLogotype && !showLogotype,
        'x__exodus-logo--show-logotype': !hideLogotype && showLogotype,
        'x__exodus-logo--menu-open': isMenuOpen,
      })}
    >
      <Logo />
      <span>Exodus</span>
    </Link>
  )
}

export default ExodusLogo
