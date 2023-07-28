import { download } from './util/download'
import { createBackup } from './util/createBackup'
import {
  formatBodySection,
  formatFooterSection,
  formatHeaderSection,
} from './formatters'
import { getTextContents } from './getTextContents'

export const songselectToOnsong = ({
  shouldSkipBackup,
  output = 'file',
}: {
  shouldSkipBackup?: boolean
  output?: 'file' | 'console' | 'newTab'
} = {}) => {
  let recoverBackup = () => {}
  if (!shouldSkipBackup) recoverBackup = createBackup()

  formatHeaderSection()
  formatBodySection()
  formatFooterSection()

  const { fullText, titleText } = getTextContents()
  const outputMap = {
    file: () => download(`${titleText}.onsong`, fullText),
    console: () => console.log(fullText),
    newTab: () => {
      const newTab = window.open()
      newTab?.document.write(`<pre>${fullText}</pre>`)
    },
  }
  outputMap[output]?.()

  recoverBackup()
}
