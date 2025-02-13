// Constants:
import { isUk } from 'src/constants'

// data.
const en = require('./navigation.json')
const es = require('./navigation__es.json')

let data = { en, es }
if (isUk) {
  const uk = require('./navigation__uk.json')
  data = { ...data, uk }
}

export const homepageItem = (pathname = 'en') => {
  const lang = data[pathname] || en
  const { home } = lang

  return {
    title: home.label,
    description: home.copy,
    href: home.path,
  }
}

export const navigationItems = (pathname = 'en') => {
  const lang = data[pathname] || en
  const { products, support, learn, company } = lang

  const buildNavigation = [
    {
      column: products.name,
      items: [
        products.web3 && {
          key: products.web3.key,
          title: products.web3.label,
          description: products.web3.copy,
          href: isUk ? '/download' : products.web3.path,
        },
        products.mobile && {
          key: products.mobile.key,
          title: products.mobile.label,
          description: products.mobile.copy,
          href: isUk ? '/download' : products.mobile.path,
        },
        products.desktop && {
          key: products.desktop.key,
          title: products.desktop.label,
          description: products.desktop.copy,
          href: isUk ? '/download' : products.desktop.path,
        },
        !isUk &&
          products.trezor && {
            key: products.trezor.key,
            title: products.trezor.label,
            description: products.trezor.copy,
            href: products.trezor.path,
          },
        !isUk &&
          products.rewards && {
            key: products.rewards.key,
            title: products.rewards.label,
            description: products.rewards.copy,
            href: products.rewards.path,
          },
        !isUk &&
          products.category && {
            name: products.category.name,
            items: [
              products.category.items.xoswap && {
                key: products.category.items.xoswap.key,
                title: products.category.items.xoswap.label,
                description: products.category.items.xoswap.copy,
                href: products.category.items.xoswap.path,
                target: '_blank',
              },
              products.category.items.passkeys && {
                key: products.category.items.passkeys.key,
                title: products.category.items.passkeys.label,
                description: products.category.items.passkeys.copy,
                href: products.category.items.passkeys.path,
                target: '_blank',
              },
              products.category.items.waas && {
                key: products.category.items.waas.key,
                title: products.category.items.waas.label,
                description: products.category.items.waas.copy,
                href: products.category.items.waas.path,
                target: '_blank',
              },
            ],
          },
      ],
    },
    {
      column: support.name,
      items: [
        support.support && {
          key: support.support.key,
          title: support.support.label,
          description: support.support.copy,
          href: support.support.path,
        },
        support.status && {
          key: support.status.key,
          title: support.status.label,
          description: support.status.copy,
          href: support.status.path,
        },
        support.legal && {
          key: support.legal.key,
          title: support.legal.label,
          description: support.legal.copy,
          href: support.legal.path,
        },
      ],
    },
    {
      column: learn.name,
      items: [
        learn.kb && {
          key: learn.kb.key,
          title: learn.kb.label,
          description: learn.kb.copy,
          href: learn.kb.path,
          target: '_blank',
        },
        !isUk &&
          learn.youtube && {
            key: learn.youtube.key,
            title: learn.youtube.label,
            description: learn.youtube.copy,
            href: learn.youtube.path,
            target: '_blank',
          },
        !isUk &&
          learn.newsletter && {
            key: learn.newsletter.key,
            title: learn.newsletter.label,
            description: learn.newsletter.copy,
            href: learn.newsletter.path,
          },
      ],
    },
    {
      column: company.name,
      items: [
        !isUk &&
          company.about && {
            key: company.about.key,
            title: company.about.label,
            description: company.about.copy,
            href: company.about.path,
          },
        !isUk &&
          company.investors && {
            key: company.investors.key,
            title: company.investors.label,
            description: company.investors.copy,
            href: company.investors.path,
          },
        company.careers && {
          key: company.careers.key,
          title: company.careers.label,
          description: company.careers.copy,
          href: company.careers.path,
        },
        company.contact && {
          key: company.contact.key,
          title: company.contact.label,
          description: company.contact.copy,
          href: company.contact.path,
        },
        !isUk &&
          company.brand && {
            key: company.brand.key,
            title: company.brand.label,
            description: company.brand.copy,
            href: company.brand.path,
          },
        !isUk &&
          company.security && {
            key: company.security.key,
            title: company.security.label,
            description: company.security.copy,
            href: company.security.path,
          },
        !isUk &&
          company.trademarks && {
            key: company.trademarks.key,
            title: company.trademarks.label,
            description: company.trademarks.copy,
            href: company.trademarks.path,
          },
      ],
    },
  ]

  const filteredNav = buildNavigation.map((section) => ({
    ...section,
    items: section.items.filter(Boolean),
  }))

  return filteredNav
}

export const downloadItem = (pathname = 'en') => {
  const lang = data[pathname] || en
  const { download } = lang

  if (!download) return {}

  return {
    title: download.label,
    href: download.path,
  }
}

export const legalItems = (pathname = 'en') => {
  const lang = data[pathname] || en
  const { privacy, terms } = lang.legal

  return {
    ...(privacy
      ? {
          privacy: {
            title: privacy.label,
            href: privacy.path,
          },
        }
      : {}),
    ...(terms
      ? {
          terms: {
            title: terms.label,
            href: terms.path,
          },
        }
      : {}),
  }
}
