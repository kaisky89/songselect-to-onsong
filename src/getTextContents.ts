import { $ } from './util/selector'

export const getTextContents = () => {
  // get text content
  const headerText = $('.cproSongHeader')
    ?.textContent?.trim()
    .split('\n')
    .filter((line) => !!line.trim())
    .map((line) => line.trim())
    .join('\n')
    .replace(/\s{2}/g, ' ')

  const bodyText = $('.cproSongBody')?.textContent?.trim()

  const titleText = $('.cproTitle')?.textContent?.trim()

  const fullText = `${headerText}\n\n${bodyText}`

  return { headerText, bodyText, titleText, fullText }
}
