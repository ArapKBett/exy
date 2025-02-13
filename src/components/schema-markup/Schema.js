// dependencies.
import React from 'react'
import { Script } from 'gatsby'
// data.
import defaultData from 'src/components/schema-markup/default-data'

const Schema = ({
  type = defaultData.type,
  name = defaultData.name,
  description = defaultData.description,
  url = defaultData.url,
  logo = defaultData.logo,
  email = defaultData.email,

  addressLocality = defaultData.address.addressLocality,
  addressRegion = defaultData.address.addressRegion,
  addressCountry = defaultData.address.addressCountry,
  postalCode = defaultData.address.postalCode,
  streetAddress = defaultData.address.streetAddress,

  founderName = defaultData.founder.name,
  founderGender = defaultData.founder.gender,
  founderJobTitle = defaultData.founder.jobTitle,
  founderImage = defaultData.founder.image,
  founderSameAs = defaultData.founder.sameAs,
  foundingDate = defaultData.foundingDate,

  sameAs = defaultData.sameAs,

  contactPointEmail = defaultData.contactPoint.email,
  contactPointUrl = defaultData.contactPoint.url,
}) => (
  <Script type="application/ld+json">
    {`
      {
        "@context": "http://schema.org",
        "@type": "${type}",
        "name": "${name}",
        "description": "${description}",
        "url": "${url}",
        "logo": "${logo}",
        "email": "${email}",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "${addressLocality}",
          "addressRegion": "${addressRegion}",
          "addressCountry": "${addressCountry}",
          "postalCode": "${postalCode}",
          "streetAddress": "${streetAddress}"
        },
        "founder": {
          "@type": "Person",
          "name": "${founderName}",
          "gender": "${founderGender}",
          "jobTitle": "${founderJobTitle}",
          "image": "${founderImage}",
          "sameAs": [${
            founderSameAs.length > 0 &&
            founderSameAs
              .map(
                (link, i) => `
            "${link}"${i !== founderSameAs.length - 1 ? ',' : ''}`
              )
              .join('')
          }
          ]
        },
        "foundingDate": "${foundingDate}",
        "sameAs": [${
          sameAs.length > 0 &&
          sameAs
            .map(
              (link, i) => `
          "${link}"${i !== sameAs.length - 1 ? ',' : ''}`
            )
            .join('')
        }
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "${contactPointEmail}",
            "url": "${contactPointUrl}"
          }
        ]
      }
    `}
  </Script>
)

export default Schema
