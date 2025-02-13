// dependencies.
import React, { useState } from 'react'
import { Link } from 'gatsby'
import Collapse from 'react-bootstrap/Collapse'

// Styles & Images:
import 'src/components/layout/Footer/scss/ModuleNavigation.scss'

// Partials:
/*
 * Wrapper:
 *  - Will return either an <a /> or <Link />, depending on the 'external' prop.
 *  - Must have attributes in order to work, can't pass them in the instance.
 */
const NavigationItem = ({ href, target, children, onClick }) => {
  const isExternal = href && href.startsWith('https://')
  const props = { className: 'x__footer-navigation__link', children, onClick }

  if (isExternal) {
    return <a href={href} {...props} target={target || '_self'} />
  }
  return <Link to={href} {...props} />
}

// Main component:
const ModuleNavigation = ({ data = [] }) => {
  const setDefault = data.map((data, d) => data[d] === false)
  const [columnOpen, setColumnOpen] = useState(false)

  // Toggle open just the clicked column.
  const toggleColumnOpen = (i) => {
    const dataCopy = [...setDefault]
    if (!columnOpen[i]) dataCopy[i] = !dataCopy[i]

    setColumnOpen(dataCopy)
  }

  // Close accordion.
  const handleClick = () => setColumnOpen(false)

  // Do not render if there is no data.
  if (!data || data.length === 0) return null

  return (
    <div className="x__footer-navigation" id="footernav">
      {data.map(({ column: heading, items: navItems }, d) => (
        <div key={`col-${d}`} className="x__footer-navigation-col">
          <div id={`footernavheading${d}`}>
            <p
              className="x__footer-navigation__heading"
              tabIndex={0}
              onClick={() => toggleColumnOpen(d)}
            >
              {heading}
            </p>
          </div>

          <Collapse in={columnOpen[d]}>
            <div>
              {navItems.map(({ href, title, items, target }, i) => {
                const navItemKey = `col-${d}_item-${i}`
                // If there are categories, render just the items.
                if (items && items.length > 0) {
                  return items.map(
                    ({ href: itemHref, title: itemTitle, target: itemTarget }, c) => (
                      <NavigationItem
                        key={`${navItemKey}_subitem-${c}`}
                        href={itemHref}
                        target={itemTarget}
                        onClick={handleClick}
                      >
                        {itemTitle}
                      </NavigationItem>
                    )
                  )
                }
                // Render the item.
                return (
                  <NavigationItem
                    key={navItemKey}
                    href={href}
                    target={target}
                    onClick={handleClick}
                  >
                    {title}
                  </NavigationItem>
                )
              })}
            </div>
          </Collapse>

          <span className="x__footer-navigation__arrow" />
        </div>
      ))}
    </div>
  )
}

export default ModuleNavigation
