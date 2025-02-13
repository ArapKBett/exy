import useMetaPixel from 'components/head/pixels/meta'
import useRedditPixel from 'components/head/pixels/reddit'
import useTikTokPixel from 'components/head/pixels/tiktok'
import useTwitterPixel from 'components/head/pixels/twitter'

export default function usePixels() {
  useMetaPixel()
  useRedditPixel()
  useTikTokPixel()
  useTwitterPixel()
}

export { useMetaPixel, useRedditPixel, useTikTokPixel, useTwitterPixel }
