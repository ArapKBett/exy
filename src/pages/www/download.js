// dependencies.
import React from 'react'
// components.
import DownloadLayout from 'src/templates/download'
import PageHead from 'src/components/head/PageHead'
// data.
import data from 'src/data/pages/Contents/download.json'

const DownloadPage = ({ location }) => (
  <DownloadLayout
    location={location}
    noindex={false}
    pageName="download"
    pageData={data}
    pathname="en"
    enableSubscribeNotice={false}
  />
)

export default DownloadPage

// <head> component:
export function Head() {
  return <PageHead page="download" src={data.src} noindex={false} />
}
