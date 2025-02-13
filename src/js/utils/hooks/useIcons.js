import { useStaticQuery, graphql } from 'gatsby'
import { useMemo } from 'react'

function getBasename(filePath) {
  const parts = filePath.split('/')
  return parts[parts.length - 1].replace('.svg', '')
}

export const useIcons = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { regex: "/@exodus/.*/" } }) {
        nodes {
          svg {
            absolutePath
            dataURI
          }
        }
      }
    }
  `)

  const icons = useMemo(() => {
    return data.allFile.nodes.reduce(
      (acc, node) => {
        if (node.svg && node.svg.dataURI) {
          const key = getBasename(node.svg.absolutePath)
          if (node.svg.absolutePath.includes('/svg/')) {
            acc.svg[key] = node.svg.dataURI
          } else if (node.svg.absolutePath.includes('/svg-transparent/')) {
            const modifiedKey = key.endsWith('-sign') ? key.slice(0, -5) : key
            acc['svg-transparent'][modifiedKey] = node.svg.dataURI
          } else if (node.svg.absolutePath.includes('/svg-network/')) {
            const modifiedKey = key.endsWith('-sign') ? key.slice(0, -5) : key
            acc['svg-network'][modifiedKey] = node.svg.dataURI
          }
        }
        return acc
      },
      { svg: {}, 'svg-transparent': {}, 'svg-network': {} }
    )
  }, [data])

  return icons
}
