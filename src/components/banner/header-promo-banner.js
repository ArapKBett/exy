import React from 'react'

import { HEADER_PROMO_BANNER_ENABLED } from 'src/constants'

import './scss/header-promo-banner.scss'
import classNames from 'classnames'

function ExodusLogo() {
  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="white">
      <path d="M16 4.54916L9.06182 0V2.54346L13.5127 5.43574L12.9891 7.09262H9.06182V9.20006H12.9891L13.5127 10.8569L9.06182 13.7492V16.2927L16 11.7581L14.8655 8.15361L16 4.54916Z" />
      <path d="M3.02545 9.20006H6.93818V7.09262H3.01091L2.50182 5.43574L6.93818 2.54346V0L0 4.54916L1.13455 8.15361L0 11.7581L6.95273 16.2927V13.7492L2.50182 10.8569L3.02545 9.20006Z" />
    </svg>
  )
}

function Content({ opacity }) {
  return (
    <>
      <span className={classNames({ opacity })}>Exodus ON NYSE American</span>
      <ExodusLogo />
    </>
  )
}

function HeaderPromoBanner() {
  if (!HEADER_PROMO_BANNER_ENABLED) return null

  return (
    <div className="x__promo-banner">
      <a
        href="https://finance.yahoo.com/news/sec-approves-crypto-wallet-maker-183305890.html"
        target="_blank"
        rel="noreferrer nofollow noopener"
      >
        {Array(24)
          .fill()
          .map((_, i) => (
            <Content key={i} opacity={i % 2 === 1} />
          ))}
      </a>
    </div>
  )
}

export default HeaderPromoBanner
