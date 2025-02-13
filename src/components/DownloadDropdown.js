// dependencies.
import React from 'react'
import PropTypes from 'prop-types'
import Dropdown from 'react-bootstrap/Dropdown'
import classNames from 'classnames'
// utils.
import logEvent from 'src/js/analytics'
import { useLatestVersion } from 'js/utils/hooks/useLatestVersion'
// constants.
import { DOWNLOADS_URL } from 'src/constants'
import {
  DOWNLOAD_LINUX_ZIP,
  DOWNLOAD_LINUX_DEB,
  DOWNLOAD_MACOS_MS,
  DOWNLOAD_MACOS_INTEL,
  DOWNLOAD_WINDOWS,
} from 'src/js/analytics/trackers'

// Helpers:
const getLinks = (version, variant) => {
  switch (variant) {
    case 'releases':
      return {
        windows: `${DOWNLOADS_URL}/exodus-windows-x64-${version}.exe`,
        macos: `${DOWNLOADS_URL}/exodus-macos-${version}.dmg`,
        'macos-m1': `${DOWNLOADS_URL}/exodus-macos-arm64-${version}.dmg`,
        'linux-deb': `${DOWNLOADS_URL}/exodus-linux-x64-${version}.deb`,
        'linux-zip': `${DOWNLOADS_URL}/exodus-linux-x64-${version}.zip`,
      }

    case 'download':
    default:
      return {
        windows: `${DOWNLOADS_URL}/exodus-windows-x64-${version}.exe`,
        macos: `${DOWNLOADS_URL}/exodus-macos-${version}.dmg`,
        'macos-m1': `${DOWNLOADS_URL}/exodus-macos-arm64-${version}.dmg`,
        'linux-deb': `${DOWNLOADS_URL}/exodus-linux-x64-${version}.deb`,
        'linux-zip': `${DOWNLOADS_URL}/exodus-linux-x64-${version}.zip`,
      }
  }
}

const labelStr = {
  en: 'Download',
  es: 'Descarga',
  uk: 'Download',
}

const legalStr = {
  en: {
    agree: 'By downloading Exodus, you agree to the',
    terms: 'Terms of Use',
    and: 'and',
    policy: 'Privacy Policy',
  },
  es: {
    agree: 'Al descargar Exodus, está aceptando los',
    terms: 'Terminos de Servicio',
    and: 'y',
    policy: 'Política de Privacidad',
  },
  uk: {
    agree: 'By downloading Exodus, you agree to the',
    terms: 'Terms of Use',
    and: 'and',
    policy: 'Privacy Policy',
  },
}

// Partials:
const StandardToggle = ({ version, appName, label }) => (
  <Dropdown.Toggle className="x__button x__button--dropdown dropdown-toggle dropdown-toggle--headernav">
    <span className="x__button-align">
      <span className="x__button-align-text">
        {label} {appName}{' '}
      </span>
    </span>

    <svg version="1.1" viewBox="0 0 11 6" xmlns="http://www.w3.org/2000/svg">
      <g fill="#fff" fillRule="nonzero">
        <path
          transform="translate(5.5 3.0485) rotate(90) translate(-5.5 -3.0485)"
          d="m8.0694 3.2926l-4.6602 4.8592c-0.13071 0.13629-0.34381 0.13751-0.47597 0.0027118-0.13216-0.1348-0.13334-0.35456-0.0026297-0.49085l4.4261-4.6152-4.4261-4.6152c-0.13071-0.13629-0.12953-0.35605 0.0026297-0.49085 0.13216-0.1348 0.34526-0.13358 0.47597 0.0027119l4.6602 4.8592c0.12984 0.13539 0.12954 0.35314-1.713e-5 0.48815l1.713e-5 -1.85e-5z"
        />
      </g>
    </svg>
  </Dropdown.Toggle>
)

const WideToggle = ({ version, appName, label }) => (
  <Dropdown.Toggle className="x__button x__button--dropdown dropdown-toggle">
    {label} {appName} {version}
    <svg version="1.1" viewBox="0 0 11 6" xmlns="http://www.w3.org/2000/svg">
      <g fill="#fff" fillRule="nonzero">
        <path
          transform="translate(5.5 3.0485) rotate(90) translate(-5.5 -3.0485)"
          d="m8.0694 3.2926l-4.6602 4.8592c-0.13071 0.13629-0.34381 0.13751-0.47597 0.0027118-0.13216-0.1348-0.13334-0.35456-0.0026297-0.49085l4.4261-4.6152-4.4261-4.6152c-0.13071-0.13629-0.12953-0.35605 0.0026297-0.49085 0.13216-0.1348 0.34526-0.13358 0.47597 0.0027119l4.6602 4.8592c0.12984 0.13539 0.12954 0.35314-1.713e-5 0.48815l1.713e-5 -1.85e-5z"
        />
      </g>
    </svg>
  </Dropdown.Toggle>
)

// Main component:
const DownloadDropdown = ({ className, variant, pathname = 'en', trackerPage, onClick }) => {
  const Toggle = variant === 'releases' ? WideToggle : StandardToggle
  const version = useLatestVersion().latest
  const label = labelStr[pathname]
  const legal = legalStr[pathname]
  const appName = 'Exodus'
  const pathForTrackers = pathname !== 'en' ? pathname : ''

  const links = getLinks(version, variant)

  const handleButtonClick = ({ analyticsArgs, pathForTrackers }) => {
    if (analyticsArgs) logEvent(analyticsArgs, trackerPage)
    if (pathForTrackers) logEvent(pathForTrackers, trackerPage)

    onClick()
  }

  return (
    <Dropdown className={classNames('x-download-dropdown', className)}>
      <Toggle version={version} appName={appName} label={label} />

      <Dropdown.Menu className="dropdown-menu download-dropdown-menu" x-placement="bottom-start">
        <a
          href={links.windows}
          className="dropdown-item ga-click-event"
          onClick={() =>
            handleButtonClick({
              analyticsArgs: DOWNLOAD_WINDOWS(),
              pathForTrackers: pathForTrackers && DOWNLOAD_WINDOWS(pathForTrackers),
            })
          }
        >
          <svg version="1.1" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <title>Download Windows App</title>
            <g fill="none" fillRule="evenodd">
              <path
                d="m0 2.5485 7.356-0.99873 0.0032156 7.0736-7.3525 0.041741-0.0067197-6.1166zm7.3525 6.8899 0.0057097 7.0798-7.3525-1.0077-4.1225e-4 -6.1195 7.3472 0.047489zm0.89172-8.0193 9.7535-1.4191v8.5334l-9.7535 0.077193v-7.1915zm9.7558 8.0859-0.002288 8.495-9.7535-1.3724-0.013666-7.1386 9.7694 0.015905z"
                fill="#fff"
                fillRule="nonzero"
              />
            </g>
          </svg>
          {label} Windows (64-bit)
        </a>

        <a
          href={links.macos}
          className="dropdown-item ga-click-event"
          onClick={() =>
            handleButtonClick({
              analyticsArgs: DOWNLOAD_MACOS_INTEL(),
              pathForTrackers: pathForTrackers && DOWNLOAD_MACOS_INTEL(pathForTrackers),
            })
          }
        >
          <svg version="1.1" viewBox="0 0 13 17" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <title>Download For Mac</title>
              <path
                d="m12.728 13.03c-0.2334 0.54934-0.50967 1.055-0.82977 1.5199-0.43632 0.63378-0.79357 1.0725-1.0689 1.3161-0.42679 0.39988-0.88407 0.60467-1.3737 0.61631-0.35153 0-0.77547-0.10191-1.2689-0.30864-0.4951-0.20576-0.95009-0.30767-1.3661-0.30767-0.43632 0-0.90426 0.10191-1.4048 0.30767-0.50129 0.20673-0.90512 0.31447-1.2139 0.32514-0.46957 0.020382-0.93761-0.19023-1.4048-0.63281-0.29818-0.26497-0.67115-0.71919-1.1179-1.3627-0.47938-0.68717-0.87349-1.484-1.1823-2.3925-0.33067-0.98125-0.49643-1.9314-0.49643-2.8513 0-1.0538 0.22349-1.9626 0.67115-2.7242 0.35182-0.61175 0.81986-1.0943 1.4057-1.4486 0.58579-0.35426 1.2187-0.53479 1.9004-0.54634 0.37297 0 0.86206 0.11754 1.4699 0.34853 0.60608 0.23177 0.99524 0.34931 1.1659 0.34931 0.12756 0 0.55988-0.13743 1.2928-0.41143 0.69306-0.2541 1.278-0.35931 1.7572-0.31786 1.2985 0.10676 2.274 0.62825 2.9228 1.5678-1.1613 0.71687-1.7357 1.7209-1.7243 3.009 0.010479 1.0033 0.36773 1.8382 1.0698 2.5011 0.31819 0.30767 0.67353 0.54546 1.0689 0.71434-0.085739 0.25332-0.17624 0.49596-0.27246 0.7289zm-2.7275-12.192c0 0.84478-0.26027 1.6335-0.77904 2.3636-0.62604 0.86791-1.3833 1.3694-2.2044 1.2903-0.010463-0.10135-0.01653-0.20801-0.01653-0.3201 0-0.81098 0.29772-1.6789 0.82643-2.3885 0.26396-0.3593 0.59967-0.65806 1.0068-0.89638 0.40623-0.23477 0.79047-0.3646 1.1519-0.38683 0.010551 0.11293 0.014948 0.22587 0.014948 0.33792v1.0427e-5z"
                fill="#fff"
                fillRule="nonzero"
              />
            </g>
          </svg>
          {label} Mac (Intel)
        </a>

        {links['macos-m1'] && (
          <a
            href={links['macos-m1']}
            className="dropdown-item ga-click-event"
            onClick={() =>
              handleButtonClick({
                analyticsArgs: DOWNLOAD_MACOS_MS(),
                pathForTrackers: pathForTrackers && DOWNLOAD_MACOS_MS(pathForTrackers),
              })
            }
          >
            <svg version="1.1" viewBox="0 0 13 17" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd">
                <title>Download For Mac</title>
                <path
                  d="m12.728 13.03c-0.2334 0.54934-0.50967 1.055-0.82977 1.5199-0.43632 0.63378-0.79357 1.0725-1.0689 1.3161-0.42679 0.39988-0.88407 0.60467-1.3737 0.61631-0.35153 0-0.77547-0.10191-1.2689-0.30864-0.4951-0.20576-0.95009-0.30767-1.3661-0.30767-0.43632 0-0.90426 0.10191-1.4048 0.30767-0.50129 0.20673-0.90512 0.31447-1.2139 0.32514-0.46957 0.020382-0.93761-0.19023-1.4048-0.63281-0.29818-0.26497-0.67115-0.71919-1.1179-1.3627-0.47938-0.68717-0.87349-1.484-1.1823-2.3925-0.33067-0.98125-0.49643-1.9314-0.49643-2.8513 0-1.0538 0.22349-1.9626 0.67115-2.7242 0.35182-0.61175 0.81986-1.0943 1.4057-1.4486 0.58579-0.35426 1.2187-0.53479 1.9004-0.54634 0.37297 0 0.86206 0.11754 1.4699 0.34853 0.60608 0.23177 0.99524 0.34931 1.1659 0.34931 0.12756 0 0.55988-0.13743 1.2928-0.41143 0.69306-0.2541 1.278-0.35931 1.7572-0.31786 1.2985 0.10676 2.274 0.62825 2.9228 1.5678-1.1613 0.71687-1.7357 1.7209-1.7243 3.009 0.010479 1.0033 0.36773 1.8382 1.0698 2.5011 0.31819 0.30767 0.67353 0.54546 1.0689 0.71434-0.085739 0.25332-0.17624 0.49596-0.27246 0.7289zm-2.7275-12.192c0 0.84478-0.26027 1.6335-0.77904 2.3636-0.62604 0.86791-1.3833 1.3694-2.2044 1.2903-0.010463-0.10135-0.01653-0.20801-0.01653-0.3201 0-0.81098 0.29772-1.6789 0.82643-2.3885 0.26396-0.3593 0.59967-0.65806 1.0068-0.89638 0.40623-0.23477 0.79047-0.3646 1.1519-0.38683 0.010551 0.11293 0.014948 0.22587 0.014948 0.33792v1.0427e-5z"
                  fill="#fff"
                  fillRule="nonzero"
                />
              </g>
            </svg>
            {label} Mac (Apple Silicon)
          </a>
        )}

        <a
          href={links['linux-deb']}
          className="dropdown-item ga-click-event"
          onClick={() =>
            handleButtonClick({
              analyticsArgs: DOWNLOAD_LINUX_DEB(),
              pathForTrackers: pathForTrackers && DOWNLOAD_LINUX_DEB(pathForTrackers),
            })
          }
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M23.738 81.424c-9.42 0-17.051 7.631-17.051 17.05 0 9.414 7.631 17.046 17.05 17.046 9.415 0 17.046-7.632 17.046-17.046 0-9.419-7.631-17.05-17.045-17.05zm121.714 77.478c-8.153 4.71-10.949 15.13-6.239 23.279 4.704 8.154 15.124 10.949 23.278 6.24 8.153-4.705 10.949-15.125 6.24-23.28-4.705-8.148-15.13-10.943-23.279-6.239zM60.766 98.474c0-16.846 8.368-31.73 21.171-40.742L69.475 36.858C54.56 46.828 43.462 62.062 38.85 79.905c5.38 4.39 8.825 11.075 8.825 18.568 0 7.489-3.444 14.174-8.825 18.565 4.605 17.847 15.703 33.083 30.624 43.053l12.462-20.88c-12.803-9.007-21.171-23.89-21.171-40.737zm49.792-49.797c26.013 0 47.355 19.944 49.595 45.38l24.291-.358c-1.195-18.778-9.398-35.636-22.003-48.032-6.482 2.449-13.97 2.074-20.44-1.656-6.483-3.741-10.547-10.052-11.659-16.902a74.26 74.26 0 0 0-19.785-2.69 73.787 73.787 0 0 0-32.818 7.663L89.584 53.31a49.596 49.596 0 0 1 20.974-4.632zm0 99.59a49.601 49.601 0 0 1-20.974-4.632L77.74 164.86a73.712 73.712 0 0 0 32.82 7.671 74.04 74.04 0 0 0 19.784-2.697c1.111-6.85 5.177-13.155 11.658-16.902 6.476-3.737 13.959-4.105 20.44-1.656 12.605-12.396 20.809-29.254 22.004-48.032l-24.297-.358c-2.235 25.443-23.576 45.38-49.59 45.38zm34.888-110.231c8.154 4.708 18.575 1.92 23.28-6.234 4.709-8.154 1.92-18.575-6.235-23.285-8.154-4.704-18.574-1.91-23.285 6.244-4.703 8.15-1.908 18.57 6.24 23.275z"
              fill="#FFF"
            />
          </svg>
          {label} Linux (.deb)
        </a>
        <a
          href={links['linux-zip']}
          className="dropdown-item ga-click-event"
          onClick={() =>
            handleButtonClick({
              analyticsArgs: DOWNLOAD_LINUX_ZIP(),
              pathForTrackers: pathForTrackers && DOWNLOAD_LINUX_ZIP(pathForTrackers),
            })
          }
        >
          <svg version="1.1" viewBox="0 0 18 24" xmlns="http://www.w3.org/2000/svg">
            <title>Download Linux App</title>
            <g fill="none" fillRule="evenodd">
              <path
                d="m17.581 19.049c-0.55-0.446-0.336-1.431-0.907-1.917 0.553-3.365-0.997-6.331-2.845-8.232-1.551-1.595-1.051-3.147-1.051-4.49 0-2.146-0.881-4.41-3.55-4.41-2.853 0-3.635 2.38-3.663 3.738-0.068 3.262 0.659 4.11-1.25 6.484-2.246 2.793-2.577 5.579-2.07 7.057-0.237 0.276-0.557 0.582-1.155 0.835-1.652 0.72-0.441 1.925-0.898 2.78-0.13 0.243-0.192 0.497-0.192 0.74 0 0.75 0.596 1.399 1.679 1.302 1.461-0.13 2.809 0.905 3.681 0.905 0.77 0 1.402-0.438 1.696-1.041 1.377-0.339 3.077-0.296 4.453 0.059 0.247 0.691 0.917 1.141 1.662 1.141 1.631 0 1.945-1.849 3.816-2.475 0.674-0.225 1.013-0.879 1.013-1.488 0-0.39-0.139-0.761-0.419-0.988zm-9.147-10.465c-0.319 0-0.583-0.258-1-0.568-0.528-0.392-1.065-0.618-1.059-1.03 0-0.283 0.379-0.37 0.869-0.681 0.526-0.333 0.731-0.671 1.249-0.671 0.53 0 0.69 0.268 1.41 0.579 0.708 0.307 1.201 0.427 1.201 0.773 0 0.355-0.741 0.609-1.158 0.868-0.613 0.378-0.928 0.73-1.512 0.73zm1.665-5.215c0.882 0.141 0.981 1.691 0.559 2.454l-0.355-0.145c0.184-0.543 0.181-1.437-0.435-1.494-0.391-0.036-0.643 0.48-0.697 0.922-0.153-0.064-0.32-0.11-0.523-0.127 0.062-0.923 0.658-1.737 1.451-1.61zm-3.403 0.331c0.676-0.168 1.075 0.618 1.078 1.435l-0.31 0.19c-0.042-0.343-0.195-0.897-0.579-0.779-0.411 0.128-0.344 1.083-0.115 1.279l-0.306 0.17c-0.42-0.707-0.419-2.133 0.232-2.295zm-2.115 19.243c-1.963-0.893-2.63-0.69-3.005-0.69-0.777 0-1.031-0.579-0.739-1.127 0.248-0.465 0.171-0.952 0.11-1.343-0.094-0.599-0.111-0.794 0.478-1.052 0.815-0.346 1.177-0.791 1.447-1.124 0.758-0.937 1.523 0.537 2.15 1.85 0.407 0.851 1.208 1.282 1.455 2.225 0.227 0.871-0.71 1.801-1.896 1.261zm6.987-1.874c-1.384 0.673-3.147 0.982-4.466 0.299-0.195-0.563-0.507-0.927-0.843-1.293 0.539-0.142 0.939-0.814 0.46-1.489-0.511-0.721-1.555-1.224-2.61-2.04-0.987-0.763-1.299-2.644 0.045-4.746-0.655 1.862-0.272 3.578 0.057 4.069 0.068-0.988 0.146-2.638 1.496-4.615 0.681-0.998 0.691-2.316 0.706-3.14l0.62 0.424c0.456 0.337 0.838 0.708 1.386 0.708 0.81 0 1.258-0.466 1.882-0.853 0.244-0.15 0.613-0.302 0.923-0.513 0.52 2.476 2.674 5.454 2.795 7.15 0.501-1.032-0.142-3.514-0.142-3.514 0.842 1.285 0.909 2.356 0.946 3.67 0.589 0.241 1.221 0.869 1.279 1.696l-0.245-0.028c-0.126-0.919-2.607-2.269-2.83-0.539-1.19 0.181-0.757 2.066-0.997 3.288-0.11 0.559-0.314 1.001-0.462 1.466zm4.846-0.041c-0.985 0.38-1.65 1.187-2.107 1.688-0.88 0.966-2.044 0.503-2.168-0.401-0.131-0.966 0.36-1.493 0.572-2.574 0.193-0.987-0.023-2.506 0.431-2.668 0.295 1.753 2.066 1.016 2.47 0.538 0.657 0 0.712 0.222 0.859 0.837 0.092 0.385 0.219 0.709 0.578 1.09 0.418 0.447 0.29 1.133-0.635 1.49zm-8-13.006c-0.651 0-1.138-0.433-1.534-0.769-0.203-0.171 0.05-0.487 0.253-0.315 0.387 0.328 0.777 0.675 1.281 0.675 0.607 0 1.142-0.519 1.867-0.805 0.247-0.097 0.388 0.285 0.143 0.382-0.704 0.277-1.269 0.832-2.01 0.832z"
                fill="#fff"
                fillRule="nonzero"
              />
            </g>
          </svg>
          {label} Linux (.zip)
        </a>

        <div className="dropdown-footer">
          {legal.agree}{' '}
          <a href="/terms/" target="_blank">
            {legal.terms}
          </a>{' '}
          {legal.and}{' '}
          <a href="/privacy/" target="_blank">
            {legal.policy}
          </a>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}

// Main component props:
DownloadDropdown.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  trackerPage: PropTypes.string,
  onClick: PropTypes.func,
}

DownloadDropdown.defaultProps = {
  variant: 'download',
  trackerPage: 'DownloadPage',
}

export default DownloadDropdown
