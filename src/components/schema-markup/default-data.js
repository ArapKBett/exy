import {
  SITE_NAME,
  SITE_URL,
  COMPANY_ADDRESS,
  CONTACT_URL,
  SUPPORT_EMAIL,
  DISCORD_URL,
  FACEBOOK_URL,
  GITHUB_URL,
  INSTAGRAM_URL,
  REDDIT_URL,
  X_URL,
  YOUTUBE_URL,
} from 'src/constants'

const SCHEMA_TYPE = 'Organization'
const SCHEMA_DESCRIPTION = 'Best Crypto Wallet for Desktop & Mobile: Altcoin & Bitcoin'
const LOGO_URL = `${SITE_URL}/img/exodus-logo.svg`
const FOUNDER = {
  name: 'JP',
  gender: 'Male',
  jobTitle: 'CEO',
  image: `${SITE_URL}/about/img/JP-Richardson.jpg`,
  sameAs: [
    'https://github.com/jprichardson',
    'https://x.com/jprichardson',
    'https://www.linkedin.com/in/jonpaulrichardson',
  ],
}
const FOUNDING_DATE = '2015-01-01'

const defaultData = {
  type: SCHEMA_TYPE,
  name: SITE_NAME,
  description: SCHEMA_DESCRIPTION,
  url: SITE_URL,
  logo: LOGO_URL,
  email: SUPPORT_EMAIL,

  address: {
    addressLocality: COMPANY_ADDRESS.city,
    addressRegion: COMPANY_ADDRESS.state,
    addressCountry: COMPANY_ADDRESS.country,
    postalCode: COMPANY_ADDRESS.zip,
    streetAddress: `${COMPANY_ADDRESS.address}, ${COMPANY_ADDRESS.address_line2}`,
  },

  founder: FOUNDER,
  foundingDate: FOUNDING_DATE,
  sameAs: [DISCORD_URL, FACEBOOK_URL, GITHUB_URL, INSTAGRAM_URL, REDDIT_URL, X_URL, YOUTUBE_URL],
  contactPoint: {
    email: SUPPORT_EMAIL,
    url: CONTACT_URL,
  },
}

export default defaultData
