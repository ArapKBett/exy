import { AssetPages } from 'src/data/pages/Assets'

const assetPages = AssetPages.map((page) => {
  return { [page.symbol]: page.path }
})

const getLink = (ticker) => {
  const obj = assetPages.find((page) => page[ticker])
  if (!obj) return null

  const link = obj[ticker]
  return link
}

export default getLink
