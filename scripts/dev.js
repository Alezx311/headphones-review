const { log, debug } = require('console')

const RXP_IMAGE_URL = /https\:\/\/.+\/([^\/\\]{1,})\.(jpg|jpeg|png|gif|img)/i

const isImageUrl = v => RXP_IMAGE_URL.test(v)
const toImageSrc = v => {
  if (!isImageUrl(v)) return null

  const matches = RXP_IMAGE_URL.exec(v)
  const url = matches?.[0] ?? ''
  const alt = matches?.[1] ?? ''
  const ext = matches?.[2] ?? ''

  return { url, alt, ext }
}

const URLS = [
  'https://manuals.plus/wp-content/uploads/2022/09/soundcore-by-Anker-Space-Q45-Adaptive-Noise-Cancelling-Headphones-7.png',
  'https://soundmag.ua/uk/bezprovidni-navushniki-knowledge-zenith-h10-over-ear-headphone-anc-black.html',
  'https://soundmag.ua',
]
