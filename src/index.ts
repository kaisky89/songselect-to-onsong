import { download } from './util/download'
import { createBackup } from './util/createBackup'
import {
  formatBodySection,
  formatFooterSection,
  formatHeaderSection,
} from './formatters'
import { getTextContents } from './getTextContents'

export const songseletToOnsong = ({
  shouldSkipBackup,
}: { shouldSkipBackup?: boolean } = {}) => {
  let recoverBackup = () => {}
  if (!shouldSkipBackup) recoverBackup = createBackup()

  formatHeaderSection()
  formatBodySection()
  formatFooterSection()

  const { fullText, titleText } = getTextContents()
  download(`${titleText}.onsong`, fullText)

  recoverBackup()
}

songseletToOnsong()
