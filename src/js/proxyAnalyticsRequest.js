import { HELPERS_URL } from 'src/constants'

const proxyAnalyticsRequest = ({ ec, ea, el }) => {
  if (!ec || !ea) return

  let url = `${HELPERS_URL}/analytics-proxy?ec=${ec}&ea=${ea}`
  if (el) url = `${url}&el=${el}`

  fetch(url).catch((err) => console.log(err))
}

export default proxyAnalyticsRequest
