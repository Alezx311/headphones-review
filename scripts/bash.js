const { log } = require('console')
const { isString } = require('./helpers')

const { resolve } = path
const RXP_IMAGE_URL = /https\:\/\/.+\/([^\/\\]{1,})\.(jpg|jpeg|png|gif|img)/i

const toImageSrc = v => {
  if (!RXP_IMAGE_URL.test(v)) {
    return null
  }
  const matches = RXP_IMAGE_URL.exec(v)
  const url = matches?.[0] ?? ''
  const alt = matches?.[1] ?? ''
  const ext = matches?.[2] ?? ''
  const file = `${alt}.${ext}`
  return { url, alt, ext, file }
}

const BASH_TITLE = '#!/bin/zsh'
const CURL_PARAMS = '--max-time 10'
const DIR_IMAGES = resolve(__dirname, '../images')

const toDownloadPath = (dir = 'downloads') => resolve(DIR_IMAGES, dir)
const toEcho = v => `echo "${v}"`
const toCurl = ({ file, alt, url }, i, arr) =>
  `\necho "${i + 1}/${arr.length} ${file}"\ncurl -o '${alt}' '${url}' ${CURL_PARAMS}\n`

const URLS = [
  'https://avatars.dzeninfra.ru/get-zen_doc/9429031/pub_64189e4a3df84b6502acc0f2_6418bd4c3e2a081a72725b1f/scale_1200',
  'https://avatars.dzeninfra.ru/get-zen_doc/9429031/pub_64189e4a3df84b6502acc0f2_6418bd4c3e2a081a72725b1f/scale_1200',
  'https://avatars.dzeninfra.ru/get-zen_doc/9429031/pub_64189e4a3df84b6502acc0f2_6418bd4c3e2a081a72725b1f/scale_1200',
  'https://avatars.dzeninfra.ru/get-zen_doc/9429031/pub_64189e4a3df84b6502acc0f2_6418bd4c3e2a081a72725b1f/scale_1200',
  'https://avatars.dzeninfra.ru/get-zen_doc/9429031/pub_64189e4a3df84b6502acc0f2_6418bd4c3e2a081a72725b1f/scale_1200',
  'https://avatars.dzeninfra.ru/get-zen_doc/9429031/pub_64189e4a3df84b6502acc0f2_6418bd4c3e2a081a72725b1f/scale_1200',
  'https://avatars.dzeninfra.ru/get-zen_doc/9429031/pub_64189e4a3df84b6502acc0f2_6418bd4c3e2a081a72725b1f/scale_1200',
  'https://avatars.dzeninfra.ru/get-zen_doc/9429031/pub_64189e4a3df84b6502acc0f2_6418bd4c3e2a081a72725b1f/scale_1200',
  'https://avatars.dzeninfra.ru/get-zen_doc/9429031/pub_64189e4a3df84b6502acc0f2_6418bd4c3e2a081a72725b1f/scale_1200',
  'https://avatars.dzeninfra.ru/get-zen_doc/9429031/pub_64189e4a3df84b6502acc0f2_6418bd4c3e2a081a72725b1f/scale_1200',
]

const toCurlMany = arr => {
  const content = arr.filter(String).map(toImageSrc).filter(Boolean).map(toCurl).filter(String)
  return `${BASH_TITLE}\n\n${content.join('\n')}`
}

const BASH_CURLS_EXAMPLE = toCurlMany(URLS)
log(BASH_CURLS_EXAMPLE)
