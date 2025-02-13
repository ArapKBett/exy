import { COUNTRIES_API_URL } from 'src/constants'

async function fetchCountryData() {
  if (typeof document === 'undefined') return

  const resRaw = await fetch(COUNTRIES_API_URL)

  if (resRaw.status === 200) {
    const res = await resRaw.json()
    if (!res.isUS) return null

    return res.isUS
  }
}

export default fetchCountryData
