import { useStaticQuery, graphql } from 'gatsby'

export const useNewAssets = () => {
  const data = useStaticQuery(graphql`
    query {
      latestReleaseJson {
        newAssets
      }
    }
  `)
  return data.latestReleaseJson.newAssets
}
