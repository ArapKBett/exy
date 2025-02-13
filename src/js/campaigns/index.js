import swagbucks from 'src/js/campaigns/swagbucks'
// import braveTest1 from 'src/js/campaigns/brave-test-1'
// import brave2110 from 'src/js/campaigns/brave-21.10'
import brave2201 from 'src/js/campaigns/brave-22.01'

const activeCampaigns = [swagbucks, brave2201]

const processCampaigns = (...args) => {
  /* run only in browser env, prevent build issues */
  if (typeof window === 'undefined') return

  activeCampaigns.forEach((campaign) => {
    campaign(...args)
  })
}

export default processCampaigns
