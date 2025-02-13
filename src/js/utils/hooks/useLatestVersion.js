import { useStaticQuery, graphql } from 'gatsby'

export const useLatestVersion = () => {
  const data = useStaticQuery(graphql`
    query {
      latestReleaseJson {
        latest
        latestBrowserExtension
        latestEden
        latestReleaseDate
        nextReleaseDate
      }
    }
  `)
  return data.latestReleaseJson
}
