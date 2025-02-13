import classNames from 'classnames'
import React, { Fragment } from 'react'

import NavigationCategory from './navigation-category'
import NavigationItem from './navigation-item'

import './dropdown-menu.scss'

function DropdownMenu({ colName, onClick, items = [], open = false }) {
  return (
    <div
      className={classNames('x__navigation-dropdown__menu', {
        'x__navigation-dropdown__menu--open': open,
      })}
    >
      <div>
        {items.map((item, index) => {
          const { description, items: category, name } = item
          const navItemKey = `col-${colName}_item-${index}`

          if (!description && !name) return null
          // If there are categories, render the items below the category name.
          if (name && category && category.length > 0) {
            return (
              <Fragment key={navItemKey}>
                <NavigationCategory name={name} />
                {category.map((categoryItem, subIndex) => (
                  <NavigationItem
                    key={`${navItemKey}_subitem-${subIndex}`}
                    name={categoryItem.key}
                    {...categoryItem}
                    onClick={onClick}
                  />
                ))}
              </Fragment>
            )
          }

          return <NavigationItem key={navItemKey} name={item.key} {...item} onClick={onClick} />
        })}
      </div>
    </div>
  )
}

export default DropdownMenu
