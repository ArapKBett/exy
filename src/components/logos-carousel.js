import React from 'react'
import classNames from 'classnames'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import ResponsiveCarousel from './responsive-carousel'
import '../../static/components/scss/logos-carousel.scss'

// Constants:
import { isUk } from 'src/constants'

const itemData1 = [
  {
    url: '/bitcoin-wallet',
    name: 'Bitcoin',
    symbol: 'BTC',
  },
  {
    url: '/ethereum-wallet',
    name: 'Ethereum',
    symbol: 'ETH',
  },
  {
    url: '/decred-wallet-dcr',
    name: 'Decred',
    symbol: 'DCR',
  },
  {
    url: '/litecoin-wallet',
    name: 'Litecoin',
    symbol: 'LTC',
  },
  {
    url: '/eos-wallet',
    name: 'EOS',
    symbol: 'EOS',
  },
]

const itemData2 = [
  {
    url: '/neo-wallet',
    name: 'Neo',
    symbol: 'NEO',
  },
  {
    url: '/monero-wallet-xmr',
    name: 'Monero',
    symbol: 'XMR',
  },
  {
    url: '/tezos-wallet-xtz',
    name: 'Tezos',
    symbol: 'XTZ',
  },
  {
    url: '/ripple-xrp-wallet',
    name: 'XRP',
    symbol: 'XRP',
  },
  {
    url: '/ontology-wallet',
    name: 'Ontology',
    symbol: 'ONT',
  },
  {
    url: '/tether-usdt-wallet',
    name: 'Tether USD',
    symbol: 'USDT',
  },
]

const itemData3 = [
  {
    url: '/ethereum-classic-wallet-etc',
    name: 'Ethereum Classic',
    symbol: 'ETC',
  },
  {
    url: '/bitcoin-cash-wallet-app',
    name: 'Bitcoin Cash',
    symbol: 'BCH',
  },
  {
    url: '/binance-coin-wallet',
    name: 'Binance Coin',
    symbol: 'BNB',
  },
  {
    url: '/zcash-wallet-zec',
    name: 'Zcash',
    symbol: 'ZEC',
  },
  {
    url: '/tron-wallet-trx',
    name: 'Tron',
    symbol: 'TRX',
  },
]

class CarouselItem extends React.PureComponent {
  render() {
    return (
      <div
        className={classNames(
          'x-assets__logos-item-container',
          'x-carousel-assets__logos-container',
          'x-assets__logos-item',
          'x-carousel-assets__logos'
        )}
      >
        {this.props.data.map((data) => (
          <OverlayTrigger
            key={data.symbol}
            placement="top"
            overlay={
              <Tooltip id={`tooltip-${data.symbol}`}>
                {data.name} <span className="x-assets__logos-title">({data.symbol})</span>
              </Tooltip>
            }
          >
            {isUk ? (
              <a data-html="true">
                {data.name} ({data.symbol})
              </a>
            ) : (
              <a href={data.url} data-html="true">
                {data.name} ({data.symbol})
              </a>
            )}
          </OverlayTrigger>
        ))}
        {this.props.showPlus && (
          <span
            className="x-assets__logos-more x-carousel-assets__logos-more"
            role="presentation"
          />
        )}
      </div>
    )
  }
}

class LogosCarousel extends React.PureComponent {
  render() {
    const { dark } = this.props
    return (
      <div className="logos-carousel-outer">
        <ResponsiveCarousel
          dark={dark}
          className="x-assets__logos x-carousel-assets__logos"
          carouselId="logosCarousel"
          interval={5000}
          controls={false}
          responsiveCutoff={1170}
          carouselItemClass="x-assets__logos-item x-carousel-assets__logos"
          noCarouselContainerClass="x-assets__logos"
          noCarouselItemClass="x-assets__logos-item x-carousel-assets__logos"
        >
          <CarouselItem data={itemData1} />
          <CarouselItem data={itemData2} />
          <CarouselItem data={itemData3} showPlus />
        </ResponsiveCarousel>
      </div>
    )
  }
}

export default LogosCarousel
